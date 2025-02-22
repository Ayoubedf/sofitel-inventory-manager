import { Bell as BellIcon } from 'lucide-react';
import { Profile } from './profile';
import { Button } from './ui/button';
import { SidebarTrigger } from './ui/sidebar';

const Header = () => {
	return (
		<header className='header flex py-4 px-2 w-full shadow-sm z-10 bg-white'>
			<div className='flex gap-2'>
				<SidebarTrigger variant='outline' className='h-10 w-auto px-4 py-2' />
				<Button variant='outline'>
					<BellIcon />
				</Button>
			</div>
			<Profile />
		</header>
	);
};

export default Header;
