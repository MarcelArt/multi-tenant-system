'use client';

import * as React from 'react';
import { ChevronsUpDown, Plus } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import useOrganization from '@/hooks/useOrganization';
import { useNavigate } from '@tanstack/react-router';

export function TeamSwitcher({
	teams,
}: {
	teams: {
		shortName: string;
		// logo: React.ElementType
		longName: string;
		organizationId: number;
	}[];
}) {
	const { isMobile } = useSidebar();
	
	const { organizationId, setOrganizationId } = useOrganization();
	const team = organizationId ? teams.find(team => team.organizationId === organizationId) : teams[0];
	
	const [activeTeam, setActiveTeam] = React.useState(team ?? teams[0]);
	const navigate = useNavigate();

	if (!organizationId && activeTeam?.organizationId) setOrganizationId(activeTeam.organizationId);

	// if (!activeTeam) {
	// 	return null;
	// }

	const onChangeTeam = (team: { shortName: string; longName: string; organizationId: number }) => {
		setOrganizationId(team.organizationId);
		setActiveTeam(team);
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
								<img src={`https://ui-avatars.com/api/?name=${activeTeam?.shortName ?? '+'}`} className="" />
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{activeTeam?.shortName ?? 'No organization'}</span>
								<span className="truncate text-xs">{activeTeam?.longName ?? 'Start a new organization'}</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						align="start"
						side={isMobile ? 'bottom' : 'right'}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-muted-foreground text-xs">Organizations</DropdownMenuLabel>
						{teams.map((team) => (
							<DropdownMenuItem key={team.shortName} onClick={() => onChangeTeam(team)} className="gap-2 p-2">
								<div className="flex size-6 items-center justify-center rounded-md border">
									<img src={`https://ui-avatars.com/api/?name=${team.shortName}`} className="size-3.5 shrink-0" />
								</div>
								{team.shortName}
								{/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="gap-2 p-2" onClick={() => navigate({ to: '/organization/create' })}>
							<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
								<Plus className="size-4" />
							</div>
							<div className="text-muted-foreground font-medium">New organization</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
