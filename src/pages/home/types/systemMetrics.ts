// types/systemMetrics.ts
export interface SystemMetricsData {
	totalQuestions: number
	totalFiles: number
	isLoading: boolean
	error: string | null
}

export interface MetricCardProps {
	title: string
	value: number
	icon: React.ReactNode
	color: string
	loading?: boolean
}
