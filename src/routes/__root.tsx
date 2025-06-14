import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { AppLayout } from '@/layout/home-layout'
import { AuthContext } from '@/lib/utils/auth'
import { NotFound } from '@/pages/not-found'

type RouteProps = {} & AuthContext // extend Route with AuthContext

export const Route = createRootRouteWithContext<RouteProps>()({
	notFoundComponent: NotFound,
	component: () => (
		<AppLayout>
			<Outlet />
		</AppLayout>
	),
})
