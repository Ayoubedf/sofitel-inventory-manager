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
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import axios from '@/api/axios';
import AuthContext from '@/context/AuthProvider';
import { Helmet } from 'react-helmet-async';
const APP_NAME = import.meta.env.VITE_APP_NAME;

export function PasswordChange({ className, ...props }) {
	const { auth } = useContext(AuthContext);
	const email = auth?.resetUser?.email;
	const newPasswordRef = useRef();
	const confirmPasswordRef = useRef();
	const [validationErrors, setValidationErrors] = useState(null);
	const [, setError] = useState(null);
	const navigate = useNavigate();

	const validate = () => {
		const errors = {};
		const formInputValues = {
			password: newPasswordRef.current.value.trim(),
			confirm_password: confirmPasswordRef.current.value.trim(),
		};

		const passwordRegex = /^(?=.*[A-z])(?=.*\d)(?=.*[@$!%*?&.]).{8,}$/;
		if (!formInputValues.password.match(passwordRegex)) {
			errors.password =
				'Password must contain at least 8 characters, one letter, and one number, and at least one special character';
		}
		if (formInputValues.confirm_password !== formInputValues.password) {
			errors.confirm_password = 'Passwords do not match';
		}
		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			email,
			password: newPasswordRef.current.value.trim(),
			confirm_password: confirmPasswordRef.current.value.trim(),
		};
		if (!validate()) return;

		axios
			.post('auth/password/change', data, {
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			})
			.then(() => {
				navigate('/login', { replace: true });
			})
			.catch((err) => {
				if (!err.response) {
					setError({ status: 0, message: err.message });
				} else {
					setError({ status: err.response.status, ...err.response.data });
				}
			});
	};
	if (!email) return <Navigate to='/' />;

	return (
		<>
			<Helmet>
				<title>Change Password | {APP_NAME}</title>
			</Helmet>
			<div className={cn('flex flex-col gap-6', className)} {...props}>
				<Card>
					<CardHeader>
						<CardTitle className='text-2xl'>Password Change</CardTitle>
						<CardDescription>
							Enter your new password and confirm it to change your password.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit}>
							<div className='flex flex-col gap-6'>
								<div className='grid gap-2'>
									<Label htmlFor='new-password'>New Password</Label>
									<Input
										ref={newPasswordRef}
										id='new-password'
										type='password'
										placeholder='secret1234@'
										autoComplete='new-password'
										aria-describedby={validationErrors?.password ? 'new-password-error' : ''}
										required
									/>
									{validationErrors?.password && (
										<p
											id='new-password-error'
											aria-live='assertive'
											className='text-red-500 text-xs mt-1'>
											{validationErrors?.password}
										</p>
									)}
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='confirm-password'>Confirm Password</Label>
									<Input
										ref={confirmPasswordRef}
										id='confirm-password'
										type='password'
										placeholder='secret1234@'
										autoComplete='confirm-password'
										aria-describedby={
											validationErrors?.confirm_password ? 'confirm-password-error' : ''
										}
										required
									/>
									{validationErrors?.password && (
										<p
											id='new-password-error'
											aria-live='assertive'
											className='text-red-500 text-xs mt-1'>
											{validationErrors?.password}
										</p>
									)}
								</div>
								<Button type='submit' className='w-full'>
									Change Password
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

PasswordChange.propTypes = {
	className: PropTypes.string,
};
