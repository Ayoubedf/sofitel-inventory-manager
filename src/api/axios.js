import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

export default axiosInstance;
