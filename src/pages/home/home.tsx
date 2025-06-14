// pages/Home.tsx
import React from 'react'
import { Row, Col, Button, Alert, Space, Typography, Divider, Flex } from 'antd'
import { PlayCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import { useSelections } from './hooks/selection'
import { SystemMetrics } from './components/SystemMetrics'
import { QuestionSelection } from './components/QuestionSelection'
import { PDFSelection } from './components/PDFSelection'

const { Title } = Typography

export const Home: React.FC = () => {
	const {
		questions,
		pdfFiles,
		selections,
		loading,
		error,
		updateQuestionSelection,
		updatePDFSelection,
		getSelectionSummary,
		refreshData,
	} = useSelections()

	const handleProcessSelections = () => {
		const summary = getSelectionSummary()
		console.log('=== SELECTION SUMMARY ===')
		console.log('Selected Questions:', summary.questions)
		console.log('Selected PDF:', summary.pdf)
		console.log('Counts:', summary.counts)
		console.log('========================')
	}

	const disableProcessSelections =
		selections.selectedQuestions.length === 0 || selections.selectedPDF === null

	return (
		<div style={{}}>
			<SystemMetrics
				refreshMetrics={refreshData}
				totalQuestions={questions.length}
				totalFiles={pdfFiles.length}
				isLoading={loading.questions || loading.pdfs}
				error={error}
			/>

			<Divider style={{ margin: '32px 0' }} />

			<>
				<Flex
					style={{ marginBottom: '24px' }}
					justify='space-between'
					align='center'
				>
					<Title
						level={3}
						style={{ margin: 0 }}
					>
						Selection Manager
					</Title>
				</Flex>

				{error && (
					<Alert
						message='Failed to load selection data'
						description={error}
						type='error'
						showIcon
						closable
						style={{ marginBottom: '24px' }}
						action={
							<Button
								size='small'
								onClick={refreshData}
							>
								Retry
							</Button>
						}
					/>
				)}

				<Row
					gutter={[24, 24]}
					style={{ marginBottom: '32px' }}
				>
					<Col
						xs={24}
						lg={12}
					>
						<QuestionSelection
							questions={questions}
							selectedQuestions={selections.selectedQuestions}
							onSelectionChange={updateQuestionSelection}
							loading={loading.questions}
						/>
					</Col>

					<Col
						xs={24}
						lg={12}
					>
						<PDFSelection
							pdfFiles={pdfFiles}
							selectedPDF={selections.selectedPDF}
							onSelectionChange={updatePDFSelection}
							loading={loading.pdfs}
						/>
					</Col>
				</Row>

				<Flex
					justify='center'
					style={{ marginBottom: '32px' }}
				>
					<Button
						type='primary'
						size='large'
						icon={<PlayCircleOutlined />}
						onClick={handleProcessSelections}
						disabled={disableProcessSelections}
						style={{ minWidth: '200px' }}
					>
						Process Selections
					</Button>
				</Flex>
			</>
		</div>
	)
}
