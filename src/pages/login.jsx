import { LoginForm } from '@/components/login-form';
import { Helmet } from 'react-helmet-async';
const APP_NAME = import.meta.env.VITE_APP_NAME;

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
