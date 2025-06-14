// types/selection.ts
export interface Question {
	id: string
	soru: string
	yordam?: string
}

export interface QuestionSelectionProps {
	questions: Question[]
	selectedQuestions: string[]
	onSelectionChange: (selectedIds: string[]) => void
	loading?: boolean
}

export interface PDFSelectionProps {
	pdfFiles: string[]
	selectedPDF: string | null
	onSelectionChange: (selectedPDF: string | null) => void
	loading?: boolean
}

export interface SelectionState {
	selectedQuestions: string[]
	selectedPDF: string | null
}
