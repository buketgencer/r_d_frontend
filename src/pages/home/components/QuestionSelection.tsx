// components/QuestionSelection.tsx
import {
	QuestionCircleOutlined,
	CheckSquareOutlined,
	CloseSquareOutlined,
} from '@ant-design/icons'
import { Card, Checkbox, List, Typography, Button, Space, Flex } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { QuestionSelectionProps } from '../types/selection'

const { Title, Text } = Typography

export const QuestionSelection: React.FC<QuestionSelectionProps> = ({
	questions,
	selectedQuestions,
	onSelectionChange,
	loading = false,
}) => {
	const { t } = useTranslation()
	const isAllSelected =
		selectedQuestions.length === questions.length && questions.length > 0

	const handleQuestionToggle = (questionId: string) => {
		const newSelection = selectedQuestions.includes(questionId)
			? selectedQuestions.filter((id) => id !== questionId)
			: [...selectedQuestions, questionId]

		onSelectionChange(newSelection)
	}

	return (
		<Card
			title={
				<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
					<QuestionCircleOutlined />
					<Title
						level={4}
						style={{ margin: 0 }}
					>
						{t('home.questionSelection.title')}
					</Title>
				</div>
			}
			extra={
				<Space>
					<Text type='secondary'>
						{selectedQuestions.length} of {questions.length} selected
					</Text>
				</Space>
			}
			style={{ marginBottom: 24 }}
			loading={loading}
		>
			<div style={{ marginBottom: 16 }}>
				<Flex
					justify='space-between'
					align='center'
				>
					<Text type='secondary'>{t('home.questionSelection.selectHint')}</Text>
					<Space>
						<Button
							size='small'
							icon={<CheckSquareOutlined />}
							onClick={() => onSelectionChange(questions.map((q) => q.id))}
							disabled={questions.length === 0 || isAllSelected}
						>
							{t('home.questionSelection.selectAll')}
						</Button>
						<Button
							size='small'
							icon={<CloseSquareOutlined />}
							onClick={() => onSelectionChange([])}
							disabled={selectedQuestions.length === 0}
						>
							{t('home.questionSelection.clearAll')}
						</Button>
					</Space>
				</Flex>
			</div>

			<List
				dataSource={questions}
				renderItem={(question) => (
					<List.Item style={{ padding: '12px 0' }}>
						<Checkbox
							checked={selectedQuestions.includes(question.id)}
							onChange={() => handleQuestionToggle(question.id)}
							style={{ width: '100%' }}
						>
							<div style={{ marginLeft: 8 }}>
								<div style={{ fontWeight: 500, marginBottom: 4 }}>
									{question.soru}
								</div>
								{question.yordam && (
									<Text
										type='secondary'
										style={{ fontSize: '12px' }}
									>
										{t('home.questionSelection.method')}:{' '}
										{question.yordam.trim().slice(0, 100)}
										{question.yordam.length > 100 && '...'}
									</Text>
								)}
							</div>
						</Checkbox>
					</List.Item>
				)}
				locale={{
					emptyText: loading
						? t('home.questionSelection.loading')
						: t('home.questionSelection.noQuestions'),
				}}
				style={{
					minHeight: '300px',
					maxHeight: '400px',
					overflowY: 'auto',
				}}
			/>
		</Card>
	)
}
