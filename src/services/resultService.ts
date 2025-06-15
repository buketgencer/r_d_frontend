import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL

export type ProcessRequest = {
	question_ids: string[]
	pdf_name: string
}

export type ProcessResult = {
	question: string
	answer: string
	status: 'answer_found' | 'answer_notfound'
}

export type ProcessResponse = {
	results: ProcessResult[]
	count: number
}

export const resultService = {
	processQuestions: async (
		request: ProcessRequest
	): Promise<ProcessResponse> => {
		const response = await axios.post<ProcessResponse>(
			`${API_BASE}/process`,
			request
		)
		return response.data
	},
}
