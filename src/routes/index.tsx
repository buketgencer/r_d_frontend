import { createFileRoute } from '@tanstack/react-router'
import { HomeLayout } from '@/layout/home-layout'
import { Home } from '@/pages/home'

export const Route = createFileRoute('/')({
	component: () => (
		<HomeLayout>
			<Home />
		</HomeLayout>
	),
})
