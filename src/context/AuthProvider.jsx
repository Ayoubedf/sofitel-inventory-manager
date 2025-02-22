import { createContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { axiosPrivate } from '@/api/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({ user: null, token: null });
	const isMounted = useRef(true);

	useEffect(() => {
		isMounted.current = true;
		return () => (isMounted.current = false);
	}, []);

	const logout = async () => {
		try {
			await axiosPrivate.delete('/auth/logout');
			if (isMounted.current) setAuth({ user: null, token: null });
		} catch (err) {
			console.error('Logout failed', err);
		}
	};

	return (
		<AuthContext.Provider value={{ auth, setAuth, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
