// pages/Home.tsx
import { PlayCircleOutlined } from '@ant-design/icons'
import { Row, Col, Button, Alert, Typography, Divider, Flex } from 'antd'
import React from 'react'
import { PDFSelection } from './components/PDFSelection'
import { QuestionSelection } from './components/QuestionSelection'
import { SystemMetrics } from './components/SystemMetrics'
import { useSelections } from './hooks/selection'

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
					style={{
						marginBottom: '32px',
						position: 'sticky',
						bottom: '24px',
						zIndex: 1000,
						width: 'auto',
						marginLeft: 'auto',
					}}
				>
					<Button
						type='primary'
						size='large'
						icon={<PlayCircleOutlined />}
						onClick={handleProcessSelections}
						disabled={disableProcessSelections}
						style={{ minWidth: '200px', width: '100%' }}
					>
						Process Selections
					</Button>
				</Flex>
			</>
		</div>
	)
}
