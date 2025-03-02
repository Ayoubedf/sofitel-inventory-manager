import axios from '@/api/axios';
import { useEffect, useContext, useRef } from 'react';
import useRefreshToken from './useRefreshToken';
import AuthContext from '@/context/AuthProvider';

const useAxiosPrivate = () => {
	const refresh = useRefreshToken();
	const { auth } = useContext(AuthContext);
	const accessTokenRef = useRef(auth?.accessToken);

	useEffect(() => {
		accessTokenRef.current = auth?.accessToken;
		const requestIntercept = axios.interceptors.request.use(
			(config) => {
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
				}
				return config;
			},
			(error) => Promise.reject(error),
		);
		const responseIntercept = axios.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				if (
					(error.response?.status === 401 || error.response?.status === 403) &&
					!prevRequest?.sent
				) {
					prevRequest.sent = true;
					try {
						const newAccessToken = await refresh();
						accessTokenRef.current = newAccessToken;
						prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
						return axios(prevRequest);
					} catch (refreshError) {
						return Promise.reject(refreshError);
					}
				}
				return Promise.reject(error);
			},
		);
		return () => {
			axios.interceptors.request.eject(requestIntercept);
			axios.interceptors.response.eject(responseIntercept);
		};
	}, [auth, refresh]);
	return axios;
};

export default useAxiosPrivate;
