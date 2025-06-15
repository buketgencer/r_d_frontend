import { Results } from '@/pages/results'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/results/')({
	component: Results,
})
