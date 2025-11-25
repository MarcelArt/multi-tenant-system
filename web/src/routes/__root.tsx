import { Outlet, createRootRoute, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import useAuth from '@/hooks/useAuth';
import { Toaster } from '@/components/ui/sonner';
import { BreadcrumbComponent } from '@/components/breadcrumb-component';
import { PermissionProvider } from '@/context/permission-context';

export const Route = createRootRoute({
	component: () => {
		const refreshToken = localStorage.getItem('refreshToken');
		const { accessToken } = useAuth();
		const navigate = useNavigate();

		if (!accessToken && !refreshToken) {
			navigate({ to: '/login' });
			return (
				<>
					<Outlet />
					<Toaster />
					<TanStackDevtools
						config={{
							position: 'bottom-right',
						}}
						plugins={[
							{
								name: 'Tanstack Router',
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				</>
			);
		}

		return (
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<BreadcrumbComponent />
					</header>
					<PermissionProvider>
						<Outlet />
					</PermissionProvider>
				</SidebarInset>
				<Toaster />
				<TanStackDevtools
					config={{
						position: 'bottom-right',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
			</SidebarProvider>
		);
	},
});
