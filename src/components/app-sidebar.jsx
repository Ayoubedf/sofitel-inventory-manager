import { Home } from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';

// Menu items.
const items = [
	{
		title: 'Dashboard',
		url: '/',
		icon: Home,
	},
];
const inventoryItems = [
	{
		title: 'server',
		url: '/category/server',
	},
	{
		title: 'ethernet switch',
		url: '/category/ethernet_switch',
	},
	{
		title: 'laptop',
		url: '/category/laptop',
	},
	{
		title: 'inverter',
		url: '/category/inverter',
	},
	{
		title: 'screen',
		url: '/category/screen',
	},
	{
		title: 'pc',
		url: '/category/pc',
	},
	{
		title: 'printer',
		url: '/category/printer',
	},
];

export default function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<Link to='/' className='logo flex flex-col items-center gap-4 mt-10'>
						<img src='/images/sofitel-logo.svg' className='w-24' />
						<img src='/images/sofitel.svg' className='w-36' />
					</Link>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Pages</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
							<SidebarMenuItem>
								<SidebarMenuSubButton>Inventory</SidebarMenuSubButton>
								<SidebarMenuSub>
									{inventoryItems.map((subItem) => (
										<SidebarMenuSubItem key={subItem.title}>
											<SidebarMenuSubButton asChild>
												<Link className='capitalize' to={subItem.url}>
													{subItem.title}
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
