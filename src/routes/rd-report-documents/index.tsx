import { createFileRoute } from '@tanstack/react-router'
import { Reports } from '@/pages/reports'

export const Route = createFileRoute('/rd-report-documents/')({
	component: Reports,
})
