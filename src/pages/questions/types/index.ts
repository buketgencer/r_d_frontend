export interface Question {
	id: string
	soru: string
	yordam?: string
}

export interface QuestionsResponse {
	questions: Question[]
	count: number
}

export interface QuestionCreate {
	soru: string
	yordam?: string
}
