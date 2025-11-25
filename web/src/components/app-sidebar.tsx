'use client';

import * as React from 'react';
import { AudioWaveform, Building2, Command, Frame, GalleryVerticalEnd, Map, PieChart, UserLock } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import userOrganizationApi from '@/api/user-organization.api';
import { FiltersBuilder } from '@/types/paged.d';
import { PermissionProvider } from '@/context/permission-context';
import type { PermissionKeys } from '@/types/permission';

// This is sample data.
const dummy = {
	// user: {
	//   name: "shadcn",
	//   email: "m@example.com",
	//   avatar: "/avatars/shadcn.jpg",
	// },
	teams: [
		{
			name: 'Acme Inc',
			logo: GalleryVerticalEnd,
			plan: 'Enterprise',
		},
		{
			name: 'Acme Corp.',
			logo: AudioWaveform,
			plan: 'Startup',
		},
		{
			name: 'Evil Corp.',
			logo: Command,
			plan: 'Free',
		},
	],
	navMain: [
		{
			title: 'Organization',
			url: '#',
			icon: Building2,
			isActive: true,
			items: [
				{
					title: 'Settings',
					url: '/organization/setting',
          permissionKey: 'organization#view' as PermissionKeys,
				},
				{
					title: 'Members',
					url: '/organization/members',
          permissionKey: 'user#view' as PermissionKeys,
				},
				{
					title: 'Access Logs',
					url: '/access-logs',
          permissionKey: 'accessLog#view' as PermissionKeys,
				},
			],
		},
		{
			title: 'User Management',
			url: '#',
			icon: UserLock,
			items: [
				{
					title: 'Roles',
					url: '/roles/',
          permissionKey: 'role#view' as PermissionKeys,
				},
				{
					title: 'Users',
					url: '/users/',
          permissionKey: 'user#view' as PermissionKeys,
				},
			],
		},
	],
	projects: [
		{
			name: 'Design Engineering',
			url: '#',
			icon: Frame,
		},
		{
			name: 'Sales & Marketing',
			url: '#',
			icon: PieChart,
		},
		{
			name: 'Travel',
			url: '#',
			icon: Map,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { email, username, userId } = useAuth();

	const filtersBuilder = new FiltersBuilder({ behaviour: 'and' });
	const filters = filtersBuilder.eq('user_id', userId!).build();

	const { status, data } = useQuery({
		queryFn: () =>
			userOrganizationApi.read({
				size: 300,
				filters: filters,
			}),
		queryKey: ['orgs-of-user', filters],
	});

	if (status !== 'success') return null;

	const organizations = data.items.map((org) => ({
		shortName: org.shortName,
		longName: org.longName,
		organizationId: org.organizationId,
	}));

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={organizations} />
			</SidebarHeader>
			<SidebarContent>
				<PermissionProvider>
					<NavMain title="Organization Management" items={dummy.navMain} />
				</PermissionProvider>
				{/* <NavProjects projects={dummy.projects} /> */}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={{ email: email ?? '', name: username ?? '', avatar: 'logo192.png' }} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
