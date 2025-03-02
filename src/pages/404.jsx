import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
const APP_NAME = import.meta.env.VITE_APP_NAME;

export default function Default() {
	const navigate = useNavigate();
	return (
		<>
			<Helmet>
				<title>404 Error - Page Missing | {APP_NAME}</title>
			</Helmet>
			{/*
				This example requires updating your template:
				```
				<html class="h-full">
				<body class="h-full">
				```
			*/}
			<main className='grid min-h-full w-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900 h-svh'>
				<div className='text-center'>
					<p className='text-7xl font-semibold text-blue-500'>404</p>
					<h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>
						Page not found
					</h1>
					<p className='mt-6 text-base leading-7 text-gray-600 dark:text-gray-400'>
						Sorry, we couldn’t find the page you’re looking for.
					</p>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<Button
							// className='inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900'
							asChild
							onClick={() => navigate(-1)}>
							<Link to='/'>Go back home</Link>
						</Button>
						<Button variant='outline' onClick={() => navigate(-1)}>
							<svg
								className='-scale-x-100 mr-2 w-5 h-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									fillRule='evenodd'
									d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
									clipRule='evenodd'></path>
							</svg>
							Go back
						</Button>
						{/* <button
							onClick={() => navigate(-1)}
							className='inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'></button> */}
					</div>
				</div>
			</main>
		</>
	);
}
