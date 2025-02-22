import {
	LogIn as LogInIcon,
	LogOut as LogOutIcon,
	User as UserIcon,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AuthContext from '@/context/AuthProvider';
import { useContext } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export function Profile() {
	const { auth, logout } = useContext(AuthContext);
	const user = auth.user || { name: 'Guest User', avatar: '' };
	const userAvatar =
		user.avatar ||
		`https://ui-avatars.com/api/?name=${encodeURIComponent(
			user.name,
		)}&background=random&color=fff`;

	const userInfo = {
		...user,
		avatar: userAvatar,
	};

	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='flex pl-10 pr-0 ml-auto'>
					<div className='flex items-center'>{userInfo.name}</div>
					<Avatar>
						<AvatarImage src={userInfo.avatar} alt={`${userInfo.name}'s avatar`} />
						<AvatarFallback className='text-xs'>{userInfo.name}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link to='/profile'>
						<DropdownMenuItem className='cursor-pointer'>
							<UserIcon />
							<span>Profile</span>
						</DropdownMenuItem>
					</Link>
					<Link to='/login'>
						<DropdownMenuItem className='cursor-pointer'>
							<LogInIcon />
							<span>{auth.user ? 'Switch Account' : 'Login'}</span>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<div onClick={handleLogout}>
					<DropdownMenuItem className='cursor-pointer'>
						<LogOutIcon />
						<span>Log out</span>
					</DropdownMenuItem>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
