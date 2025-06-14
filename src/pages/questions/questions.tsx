import {
	EyeOutlined,
	EditOutlined,
	DeleteOutlined,
	PlusOutlined,
} from '@ant-design/icons'
import {
	Table,
	Modal,
	Typography,
	message,
	Button,
	Space,
	Popconfirm,
	Form,
	Input,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const { Title, Text } = Typography
const { TextArea } = Input

interface Question {
	id: string
	soru: string
	yordam?: string
}

interface QuestionsResponse {
	questions: Question[]
	count: number
}

interface QuestionCreate {
	soru: string
	yordam?: string
}

export const Questions: React.FC = () => {
	const [questions, setQuestions] = useState<Question[]>([])
	const [loading, setLoading] = useState(true)
	const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
		null
	)
	const [viewModalVisible, setViewModalVisible] = useState(false)
	const [editModalVisible, setEditModalVisible] = useState(false)
	const [addModalVisible, setAddModalVisible] = useState(false)
	const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
	const [form] = Form.useForm()
	const [addForm] = Form.useForm()

	// API base URL from environment variables
	const API_BASE = import.meta.env.VITE_API_BASE_URL

	// Fetch questions from API
	const fetchQuestions = async () => {
		try {
			setLoading(true)
			const response = await axios.get<QuestionsResponse>(
				`${API_BASE}/questions`
			)
			setQuestions(response.data.questions)
		} catch (error) {
			message.error('Failed to load questions')
			console.error('Error fetching questions:', error)
		} finally {
			setLoading(false)
		}
	}

	// Delete question
	const deleteQuestion = async (id: string) => {
		try {
			await axios.delete(`${API_BASE}/question/${id}`)
			message.success('Question deleted successfully')
			fetchQuestions() // Refresh the list
		} catch (error) {
			message.error('Failed to delete question')
			console.error('Error deleting question:', error)
		}
	}

	// Add new question
	const addQuestion = async (data: QuestionCreate) => {
		try {
			await axios.post(`${API_BASE}/question`, data)
			message.success('Question added successfully')
			setAddModalVisible(false)
			addForm.resetFields()
			fetchQuestions() // Refresh the list
		} catch (error) {
			message.error('Failed to add question')
			console.error('Error adding question:', error)
		}
	}
	const updateQuestion = async (id: string, data: QuestionCreate) => {
		try {
			await axios.put(`${API_BASE}/question/${id}`, data)
			message.success('Question updated successfully')
			setEditModalVisible(false)
			setEditingQuestion(null)
			form.resetFields()
			fetchQuestions() // Refresh the list
		} catch (error) {
			message.error('Failed to update question')
			console.error('Error updating question:', error)
		}
	}

	useEffect(() => {
		fetchQuestions()
	}, [])

	// Handle add question
	const handleAdd = () => {
		setAddModalVisible(true)
	}

	// Handle view question
	const handleView = (question: Question) => {
		setSelectedQuestion(question)
		setViewModalVisible(true)
	}

	// Handle edit question
	const handleEdit = (question: Question) => {
		setEditingQuestion(question)
		form.setFieldsValue({
			soru: question.soru,
			yordam: question.yordam || '',
		})
		setEditModalVisible(true)
	}

	// Handle delete question
	const handleDelete = (id: string) => {
		deleteQuestion(id)
	}

	// Handle view modal close
	const handleViewModalClose = () => {
		setViewModalVisible(false)
		setSelectedQuestion(null)
	}

	// Handle add modal close
	const handleAddModalClose = () => {
		setAddModalVisible(false)
		addForm.resetFields()
	}

	// Handle edit modal close
	const handleEditModalClose = () => {
		setEditModalVisible(false)
		setEditingQuestion(null)
		form.resetFields()
	}

	// Handle add form submit
	const handleAddSubmit = async () => {
		try {
			const values = await addForm.validateFields()
			await addQuestion({
				soru: values.soru,
				yordam: values.yordam || undefined,
			})
		} catch (error) {
			console.error('Form validation failed:', error)
		}
	}

	// Handle edit form submit
	const handleEditSubmit = async () => {
		try {
			const values = await form.validateFields()
			if (editingQuestion) {
				await updateQuestion(editingQuestion.id, {
					soru: values.soru,
					yordam: values.yordam || undefined,
				})
			}
		} catch (error) {
			console.error('Form validation failed:', error)
		}
	}

	// Table columns configuration
	const columns: ColumnsType<Question> = [
		{
			title: 'Questions',
			dataIndex: 'soru',
			key: 'soru',
			render: (text: string) => (
				<Text ellipsis={{ tooltip: text }}>{text}</Text>
			),
		},
		{
			title: 'Actions',
			key: 'actions',
			width: 150,
			render: (_, record) => (
				<Space size='small'>
					<Button
						type='text'
						icon={<EyeOutlined />}
						onClick={(e) => {
							e.stopPropagation()
							handleView(record)
						}}
						title='View'
					/>
					<Button
						type='text'
						icon={<EditOutlined />}
						onClick={(e) => {
							e.stopPropagation()
							handleEdit(record)
						}}
						title='Edit'
					/>
					<Popconfirm
						title='Delete Question'
						description='Are you sure you want to delete this question?'
						onConfirm={(e) => {
							e?.stopPropagation()
							handleDelete(record.id)
						}}
						okText='Yes'
						cancelText='No'
						onCancel={(e) => e?.stopPropagation()}
					>
						<Button
							type='text'
							danger
							icon={<DeleteOutlined />}
							onClick={(e) => e.stopPropagation()}
							title='Delete'
						/>
					</Popconfirm>
				</Space>
			),
		},
	]

	return (
		<div style={{ padding: '24px' }}>
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
					Questions
				</Title>
				<Button
					type='primary'
					icon={<PlusOutlined />}
					onClick={handleAdd}
				>
					Add New Question
				</Button>
			</div>

			<Table
				columns={columns}
				dataSource={questions}
				rowKey='id'
				loading={loading}
				pagination={{
					pageSize: 10,
					showSizeChanger: true,
					showQuickJumper: true,
					showTotal: (total, range) =>
						`${range[0]}-${range[1]} of ${total} questions`,
				}}
				locale={{
					emptyText: 'No questions found',
				}}
			/>

			{/* View Modal */}
			<Modal
				title='Question Details'
				open={viewModalVisible}
				onCancel={handleViewModalClose}
				footer={null}
				width={600}
			>
				{selectedQuestion && (
					<div style={{ padding: '16px 0' }}>
						<div style={{ marginBottom: '16px' }}>
							<Title level={4}>Question (Soru):</Title>
							<Text>{selectedQuestion.soru}</Text>
						</div>

						{selectedQuestion.yordam && (
							<div>
								<Title level={4}>Procedure (Yordam):</Title>
								<Text>{selectedQuestion.yordam}</Text>
							</div>
						)}

						{!selectedQuestion.yordam && (
							<div>
								<Title level={4}>Procedure (Yordam):</Title>
								<Text
									type='secondary'
									italic
								>
									No procedure provided
								</Text>
							</div>
						)}
					</div>
				)}
			</Modal>

			{/* Add Modal */}
			<Modal
				title='Add New Question'
				open={addModalVisible}
				onCancel={handleAddModalClose}
				onOk={handleAddSubmit}
				okText='Add'
				cancelText='Cancel'
				width={600}
			>
				<Form
					form={addForm}
					layout='vertical'
					style={{ marginTop: '16px' }}
				>
					<Form.Item
						name='soru'
						label='Question (Soru)'
						rules={[
							{ required: true, message: 'Please enter the question' },
							{ min: 1, message: 'Question cannot be empty' },
						]}
					>
						<TextArea
							rows={4}
							placeholder='Enter the question...'
						/>
					</Form.Item>

					<Form.Item
						name='yordam'
						label='Procedure (Yordam)'
					>
						<TextArea
							rows={4}
							placeholder='Enter the procedure (optional)...'
						/>
					</Form.Item>
				</Form>
			</Modal>

			{/* Edit Modal */}
			<Modal
				title='Edit Question'
				open={editModalVisible}
				onCancel={handleEditModalClose}
				onOk={handleEditSubmit}
				okText='Update'
				cancelText='Cancel'
				width={600}
			>
				<Form
					form={form}
					layout='vertical'
					style={{ marginTop: '16px' }}
				>
					<Form.Item
						name='soru'
						label='Question (Soru)'
						rules={[
							{ required: true, message: 'Please enter the question' },
							{ min: 1, message: 'Question cannot be empty' },
						]}
					>
						<TextArea
							rows={4}
							placeholder='Enter the question...'
						/>
					</Form.Item>

					<Form.Item
						name='yordam'
						label='Procedure (Yordam)'
					>
						<TextArea
							rows={4}
							placeholder='Enter the procedure (optional)...'
						/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}
