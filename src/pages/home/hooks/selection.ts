// hooks/useSelections.ts
import { useState, useEffect } from 'react'
import { Question, SelectionState } from '../types/selection'
import { questionService } from '@/pages/questions/services/questionService'
import { pdfService } from '@/pages/reports/services/pdfService'

export const useSelections = () => {
	const [questions, setQuestions] = useState<Question[]>([])
	const [pdfFiles, setPdfFiles] = useState<string[]>([])
	const [selections, setSelections] = useState<SelectionState>({
		selectedQuestions: [],
		selectedPDF: null,
	})
	const [loading, setLoading] = useState({
		questions: true,
		pdfs: true,
	})
	const [error, setError] = useState<string | null>(null)

	const fetchData = async () => {
		try {
			setLoading({ questions: true, pdfs: true })
			setError(null)

			const [questionsResponse, pdfResponse] = await Promise.all([
				questionService.getQuestions(),
				pdfService.getPDFs(),
			])

			const fetchedQuestions = questionsResponse.questions
			const fetchedPDFs = pdfResponse.pdf_files

			setQuestions(fetchedQuestions)
			setPdfFiles(fetchedPDFs)

			// Auto-select all questions by default
			setSelections((prev) => ({
				...prev,
				selectedQuestions: fetchedQuestions.map((q) => q.id),
			}))

			setLoading({ questions: false, pdfs: false })
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Failed to fetch data')
			setLoading({ questions: false, pdfs: false })
		}
	}

	const updateQuestionSelection = (selectedIds: string[]) => {
		setSelections((prev) => ({
			...prev,
			selectedQuestions: selectedIds,
		}))
	}

	const updatePDFSelection = (selectedPDF: string | null) => {
		setSelections((prev) => ({
			...prev,
			selectedPDF,
		}))
	}

	const getSelectionSummary = () => {
		const selectedQuestionsData = questions.filter((q) =>
			selections.selectedQuestions.includes(q.id)
		)

		return {
			questions: selectedQuestionsData,
			pdf: selections.selectedPDF,
			counts: {
				totalQuestions: questions.length,
				selectedQuestions: selections.selectedQuestions.length,
				totalPDFs: pdfFiles.length,
				hasSelectedPDF: !!selections.selectedPDF,
			},
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return {
		questions,
		pdfFiles,
		selections,
		loading,
		error,
		updateQuestionSelection,
		updatePDFSelection,
		getSelectionSummary,
		refreshData: fetchData,
	}
}
