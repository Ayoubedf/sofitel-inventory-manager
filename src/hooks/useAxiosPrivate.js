import { axiosPrivate } from '@/api/axios';
import { useEffect, useContext } from 'react';
import useRefreshToken from './useRefreshToken';
import AuthContext from '@/context/AuthProvider';

const useAxiosPrivate = () => {
	const refresh = useRefreshToken();
	const { auth } = useContext(AuthContext);
	useEffect(() => {
		const requestIntercept = axiosPrivate.interceptors.request.use(
			(config) => {
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
					// console.log(auth.accessToken);
				}
				return config;
			},
			(error) => Promise.reject(error),
		);
		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;

				if (error.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const newAccessToken = await refresh();
					prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
					// console.log(axiosPrivate);

					return axiosPrivate(prevRequest);
				}
				return Promise.reject(error);
			},
		);
		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept);
			axiosPrivate.interceptors.response.eject(responseIntercept);
		};
	}, [auth, refresh]);
	return axiosPrivate;
};

export default useAxiosPrivate;
