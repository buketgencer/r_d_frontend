import { message } from 'antd'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { questionService } from '../services/questionService'
import { Question, QuestionCreate } from '../types'

export const useQuestions = () => {
	const [questions, setQuestions] = useState<Question[]>([])
	const [loading, setLoading] = useState(true)
	const { t } = useTranslation()

	const fetchQuestions = async () => {
		try {
			setLoading(true)
			const response = await questionService.getQuestions()
			setQuestions(response.questions)
		} catch (error) {
			message.error(t('questions.messages.loadError'))
			console.error('Error fetching questions:', error)
		} finally {
			setLoading(false)
		}
	}

	const deleteQuestion = async (id: string) => {
		try {
			await questionService.deleteQuestion(id)
			message.success(t('questions.messages.deleteSuccess'))
			fetchQuestions()
		} catch (error) {
			message.error(t('questions.messages.deleteError'))
			console.error('Error deleting question:', error)
		}
	}

	const addQuestion = async (data: QuestionCreate) => {
		try {
			await questionService.addQuestion(data)
			message.success(t('questions.messages.addSuccess'))
			fetchQuestions()
			return true
		} catch (error) {
			message.error(t('questions.messages.addError'))
			console.error('Error adding question:', error)
			return false
		}
	}

	const updateQuestion = async (id: string, data: QuestionCreate) => {
		try {
			await questionService.updateQuestion(id, data)
			message.success(t('questions.messages.editSuccess'))
			fetchQuestions()
			return true
		} catch (error) {
			message.error(t('questions.messages.editError'))
			console.error('Error updating question:', error)
			return false
		}
	}

	useEffect(() => {
		fetchQuestions()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		questions,
		loading,
		deleteQuestion,
		addQuestion,
		updateQuestion,
		refreshQuestions: fetchQuestions,
	}
}
