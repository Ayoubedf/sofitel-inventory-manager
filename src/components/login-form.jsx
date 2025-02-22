import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import axios from '@/api/axios';
import AuthContext from '@/context/AuthProvider';

export function LoginForm({ className, ...props }) {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [validationErrors, setValidationErrors] = useState(null);
	const [error, setError] = useState(null);
	const { setAuth } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const validate = () => {
		const errors = {};
		const formInputValues = {
			email: emailRef.current.value.toLowerCase().trim(),
			password: passwordRef.current.value.trim(),
		};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const passwordRegex = /^(?=.*[A-z])(?=.*\d)(?=.*[@$!%*?&.]).{8,}$/;
		if (!formInputValues.email.match(emailRegex)) {
			errors.email = 'Invalid email';
		}
		if (!formInputValues.password.match(passwordRegex)) {
			errors.password =
				'Password must contain at least 8 characters, one letter, and one number, and at least one special character';
		}
		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const resetForm = () => {
		emailRef.current.value = '';
		passwordRef.current.value = '';
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};
		if (!validate()) return;

		axios
			.post('/auth/login', data, {
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			})
			.then((res) => {
				const { user, accessToken } = res.data;
				setAuth({ user, accessToken });
				resetForm();
				navigate(from, { replace: true, state: { just_logged: true } });
			})
			.catch((err) => {
				if (!err.response) {
					setError({ status: 0, message: err.message });
				} else {
					setError({ status: err.response.status, ...err.response.data });
				}
			});
	};

	const handleForgotPassword = (e) => {
		e.preventDefault();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRef.current.value.match(emailRegex)) {
			setValidationErrors({ email: 'Invalid email' });
			return;
		}

		axios
			.post('auth/forgot-password', { email: emailRef.current.value })
			.then(() => {
				setAuth({ resetUser: { email: emailRef.current.value } });
				navigate('/password/reset');
			});
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className='flex flex-col gap-6'>
							<div className='grid gap-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									ref={emailRef}
									autoComplete='email'
									id='email'
									type='email'
									placeholder='m@example.com'
									required
								/>
								{validationErrors?.email && (
									<p aria-live='assertive' className='text-red-500 text-xs mt-1'>
										{validationErrors.email}
									</p>
								)}
							</div>
							<div className='grid gap-2'>
								<div className='flex items-center'>
									<Label htmlFor='password'>Password</Label>
									<Link
										to='/password/reset'
										onClick={handleForgotPassword}
										className='ml-auto inline-block text-sm underline-offset-4 hover:underline'>
										Forgot your password?
									</Link>
								</div>
								<Input
									ref={passwordRef}
									autoComplete='current-password'
									id='password'
									type='password'
									required
								/>
								{validationErrors?.password && (
									<p aria-live='assertive' className='text-red-500 text-xs mt-1'>
										{validationErrors.password}
									</p>
								)}
							</div>
							<Button type='submit' className='w-full'>
								Login
							</Button>
							{error && (
								<p aria-live='assertive' className='text-red-500 text-xs mt-1'>
									{error.message}
								</p>
							)}
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
LoginForm.propTypes = {
	className: PropTypes.string,
};
