import axios from 'axios';
const BASE_URL = 'https://sofitel-inventory-manager-api.onrender.com';

export default axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
	headers: {
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mzc1NjM4OTB9.bndsnsf_0cOXJ0xX8DXrElDMePmfP9zq6oRNPKGIYkM',
	},
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});
