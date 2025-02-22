import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import Header from '@/components/header';
import AppSideBar from '@/components/app-sidebar';

export default function Layout() {
	return (
		<SidebarProvider>
			<AppSideBar />
			<div className='main-layout flex-1 bg-gray-100'>
				<Header />
				<main className='content'>
					<Outlet />
				</main>
			</div>
		</SidebarProvider>
	);
}
