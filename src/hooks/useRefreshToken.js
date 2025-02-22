import { useContext } from 'react';
import axios from '@/api/axios';
import AuthContext from '@/context/AuthProvider';

const useRefreshToken = () => {
	const { setAuth } = useContext(AuthContext);

	const refresh = async () => {
		const response = await axios.get('/refresh', {
			withCredentials: true,
		});
		setAuth((prev) => {
			return {
				...prev,
				accessToken: response.data.accessToken,
				user: response.data.user,
			};
		});
		return response.data.accessToken;
	};
	return refresh;
};

export default useRefreshToken;
