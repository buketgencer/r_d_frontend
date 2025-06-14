import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rd-report-documents/')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/rd-report-documents/"!</div>
}
