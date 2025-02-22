import { LoginForm } from '@/components/login-form';
import { APP_NAME } from '@/config';
import { Helmet } from 'react-helmet-async';
// import useRefreshToken from '@/hooks/useRefreshToken';
// import Users from '@/components/Users';

export default function Page() {
	// const refresh = useRefreshToken();
	return (
		<>
			<Helmet>
				<title>Login | {APP_NAME}</title>
			</Helmet>
			<LoginForm />
			{/* <button onClick={() => refresh()}>refresh</button> */}
		</>
	);
}
