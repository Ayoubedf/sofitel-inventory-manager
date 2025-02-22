import { Outlet, Route, Routes } from 'react-router-dom';
import OTPInput from '@/pages/otp-form';
// import Layout from '@/pages/layout.jsx';
import Layout from '@/app/layout';
import Default from '@/pages/404.jsx';
import Category from '@/pages/category.jsx';
import DashBoard from '@/pages/dashboard';
import Login from '@/pages/login.jsx';
import RequireAuth from '@/pages/requireAuth.jsx';
import { PasswordChange } from './pages/change-password';

const Content = () => (
	<div className='container max-w-screen-xl mx-auto pt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 gap-2 px-2'>
		<Outlet />
	</div>
);
const Container = () => (
	<div className='flex w-full h-full items-center justify-center p-6 md:p-10 col-span-full'>
		<div className='w-full max-w-sm'>
			<Outlet />
		</div>
	</div>
);

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route element={<RequireAuth />}>
					<Route element={<Content />}>
						<Route index element={<DashBoard />} />
						<Route path='category/:cat' element={<Category />} />
					</Route>
				</Route>
				<Route element={<Container />}>
					<Route path='login' element={<Login />} />
					<Route path='password'>
						<Route path='reset' element={<OTPInput />} />
						<Route path='change' element={<PasswordChange />} />
					</Route>
				</Route>
			</Route>
			<Route path='*' element={<Default />} />
		</Routes>
	);
}

export default App;
