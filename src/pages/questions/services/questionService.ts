import axios from 'axios'
import { Question, QuestionCreate, QuestionsResponse } from '../types'

const API_BASE = import.meta.env.VITE_API_BASE_URL

export const questionService = {
	getQuestions: async (): Promise<QuestionsResponse> => {
		const response = await axios.get<QuestionsResponse>(`${API_BASE}/questions`)
		return response.data
	},

	deleteQuestion: async (id: string): Promise<void> => {
		await axios.delete(`${API_BASE}/question/${id}`)
	},

	addQuestion: async (data: QuestionCreate): Promise<void> => {
		await axios.post(`${API_BASE}/question`, data)
	},

	updateQuestion: async (id: string, data: QuestionCreate): Promise<void> => {
		await axios.put(`${API_BASE}/question/${id}`, data)
	},
}
