import { createFileRoute } from '@tanstack/react-router'
import { Questions } from '@/pages/questions'

export const Route = createFileRoute('/questions/')({
	component: Questions,
})
