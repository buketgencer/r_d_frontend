// hooks/useSystemMetrics.ts
import { useState, useEffect } from 'react'
import { SystemMetricsData } from '../types/systemMetrics'
import { questionService } from '@/pages/questions/services/questionService'
import { pdfService } from '@/pages/reports/services/pdfService'

export const useSystemMetrics = () => {
	const [metrics, setMetrics] = useState<SystemMetricsData>({
		totalQuestions: 0,
		totalFiles: 0,
		isLoading: true,
		error: null,
	})

	const fetchMetrics = async () => {
		try {
			setMetrics((prev) => ({ ...prev, isLoading: true, error: null }))

			// Fetch both questions and PDFs concurrently
			const [questionsResponse, pdfResponse] = await Promise.all([
				questionService.getQuestions(),
				pdfService.getPDFs(),
			])

			setMetrics({
				totalQuestions: questionsResponse.count,
				totalFiles: pdfResponse.count,
				isLoading: false,
				error: null,
			})
		} catch (error) {
			setMetrics((prev) => ({
				...prev,
				isLoading: false,
				error:
					error instanceof Error ? error.message : 'Failed to fetch metrics',
			}))
		}
	}

	const refreshMetrics = () => {
		fetchMetrics()
	}

	useEffect(() => {
		fetchMetrics()
	}, [])

	return {
		...metrics,
		refreshMetrics,
	}
}
