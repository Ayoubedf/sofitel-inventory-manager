import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import useRefreshToken from '@/hooks/useRefreshToken';
import Spinner from '@/components/ui/spinner';

const RequireAuth = () => {
	const { auth } = useContext(AuthContext);
	const location = useLocation();
	const navigate = useNavigate();
	const refresh = useRefreshToken();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const verifyAuth = async () => {
			try {
				if (!auth?.user)
					if (!(await refresh())) throw new Error('Token refresh failed');
			} catch {
				navigate('/login', { replace: true, state: { from: location } });
			} finally {
				setLoading(false);
			}
		};
		verifyAuth();
	}, [auth, location, navigate, refresh]);

	if (loading) return <Spinner />;
	if (!auth?.user)
		return <Navigate to='/login' state={{ from: location }} replace />;

	return <Outlet />;
};

export default RequireAuth;
