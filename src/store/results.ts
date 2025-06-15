import { create } from 'zustand'
import { ProcessResult, ProcessResponse } from '@/services/resultService'

// Store state type
type ResultsStore = {
	// State
	results: ProcessResult[]
	count: number
	pdfName: string
	isLoading: boolean

	// Actions
	setResults: (response: ProcessResponse, pdfName: string) => void
	resetResults: () => void
	setLoading: (isLoading: boolean) => void
}

// Create store
export const useResultsStore = create<ResultsStore>((set) => ({
	// Initial state
	results: [],
	count: 0,
	pdfName: '',
	isLoading: false,

	// Actions
	setResults: (response: ProcessResponse, pdfName: string) => {
		set({
			results: response.results,
			count: response.count,
			pdfName,
			isLoading: false,
		})
	},

	resetResults: () => {
		set({
			results: [],
			count: 0,
			pdfName: '',
			isLoading: false,
		})
	},

	setLoading: (isLoading: boolean) => {
		set({ isLoading })
	},
}))
