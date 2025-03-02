import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '../components/ui/input-otp';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from '../components/ui/card';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Button } from '../components/ui/button';
import { useContext, useRef, useState } from 'react';
import AuthContext from '@/context/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from '@/api/axios';
import { Helmet } from 'react-helmet-async';
const APP_NAME = import.meta.env.VITE_APP_NAME;

export default function OTPInput() {
	const { auth } = useContext(AuthContext);
	const email = auth?.resetUser?.email;
	const otpRef = useRef();
	const navigate = useNavigate();
	const [isResending, setIsResending] = useState(false);
	const [resendMessage, setResendMessage] = useState('');
	const [resendCount, setResendCount] = useState(0);
	const [cooldown, setCooldown] = useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		const otp = otpRef.current.value;
		axios.post('/auth/verify-otp', { email, otp }).then(() => {
			navigate('/password/change', { replace: true });
		});
	};

	const handleResend = async () => {
		if (!email || cooldown > 0) return;
		setIsResending(true);
		setResendMessage('');

		try {
			await axios.post('/auth/forgot-password', { email });

			setResendMessage('A new OTP has been sent to your email.');
			setResendCount((prevCount) => prevCount + 1);

			if (resendCount >= 2) {
				setCooldown(60);
				const interval = setInterval(() => {
					setCooldown((prevCooldown) => {
						if (prevCooldown <= 1) {
							clearInterval(interval);
							return 0;
						}
						return prevCooldown - 1;
					});
				}, 1000);
			}
		} catch (error) {
			console.error('Failed to resend OTP:', error);
			setResendMessage('Failed to resend OTP. Please try again.');
		} finally {
			setIsResending(false);
		}
	};

	if (!email) return <Navigate to='/' />;
	return (
		<>
			<Helmet>
				<title>Verify OTP | {APP_NAME}</title>
			</Helmet>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Reset your password</CardTitle>
					<CardDescription>
						Enter the 4-digit verification code that was sent to your email.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form id='otp-form' onSubmit={handleSubmit}>
						<div className='flex items-center justify-center gap-3'>
							<div className='space-y-2'>
								<InputOTP ref={otpRef} maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
									</InputOTPGroup>
								</InputOTP>
							</div>
						</div>
						<div className='max-w-[260px] mx-auto mt-4'>
							<Button type='submit' className='w-full'>
								Next
							</Button>
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<div className='text-sm text-slate-500 mt-4' aria-live='polite'>
						Didn&apos;t receive code?
						<Button
							variant='link'
							className='font-medium text-[#af8b10] border-none !outline-none p-0 ml-1'
							onClick={handleResend}
							disabled={isResending || cooldown > 0}>
							{isResending
								? 'Resending...'
								: cooldown > 0
								? `Resend in ${cooldown}s`
								: 'Resend'}
						</Button>
						{resendMessage && (
							<p className='text-sm mt-2 text-green-600'>{resendMessage}</p>
						)}
					</div>
				</CardFooter>
			</Card>
		</>
	);
}
