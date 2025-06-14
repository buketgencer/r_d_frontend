import { PlusOutlined } from '@ant-design/icons'
import { Typography, Button } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ViewModal, AddModal, EditModal } from './components/QuestionModals'
import { QuestionTable } from './components/QuestionTable'
import { useQuestions } from './hooks/useQuestions'
import { Question } from './types'

const { Title } = Typography

export const Questions: React.FC = () => {
	const { t } = useTranslation()
	const { questions, loading, deleteQuestion, addQuestion, updateQuestion } =
		useQuestions()

	const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
		null
	)
	const [viewModalVisible, setViewModalVisible] = useState(false)
	const [editModalVisible, setEditModalVisible] = useState(false)
	const [addModalVisible, setAddModalVisible] = useState(false)

	const handleView = (question: Question) => {
		setSelectedQuestion(question)
		setViewModalVisible(true)
	}

	const handleEdit = (question: Question) => {
		setSelectedQuestion(question)
		setEditModalVisible(true)
	}

	const handleAdd = () => {
		setAddModalVisible(true)
	}

	const handleViewModalClose = () => {
		setViewModalVisible(false)
		setSelectedQuestion(null)
	}

	const handleAddModalClose = () => {
		setAddModalVisible(false)
	}

	const handleEditModalClose = () => {
		setEditModalVisible(false)
		setSelectedQuestion(null)
	}

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '16px',
				}}
			>
				<Title
					level={2}
					style={{ margin: 0 }}
				>
					{t('questions.title')}
				</Title>
				<Button
					type='primary'
					icon={<PlusOutlined />}
					onClick={handleAdd}
				>
					{t('questions.addNew')}
				</Button>
			</div>

			<QuestionTable
				questions={questions}
				loading={loading}
				onView={handleView}
				onEdit={handleEdit}
				onDelete={deleteQuestion}
			/>

			<ViewModal
				visible={viewModalVisible}
				question={selectedQuestion}
				onClose={handleViewModalClose}
			/>

			<AddModal
				visible={addModalVisible}
				onClose={handleAddModalClose}
				onSubmit={addQuestion}
			/>

			<EditModal
				visible={editModalVisible}
				question={selectedQuestion}
				onClose={handleEditModalClose}
				onSubmit={updateQuestion}
			/>
		</>
	)
}
