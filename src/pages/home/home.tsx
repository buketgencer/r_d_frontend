// pages/Home.tsx
import { PlayCircleOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import {
	Row,
	Col,
	Button,
	Alert,
	Typography,
	Divider,
	Flex,
	message,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { PDFSelection } from './components/PDFSelection'
import { QuestionSelection } from './components/QuestionSelection'
import { SystemMetrics } from './components/SystemMetrics'
import { useSelections } from './hooks/selection'
import { resultService } from '@/services/resultService'
import { useResultsStore } from '@/store/results'

const { Title } = Typography

export const Home: React.FC = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
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

	const setResults = useResultsStore((state) => state.setResults)
	const setLoading = useResultsStore((state) => state.setLoading)
	const isProcessing = useResultsStore((state) => state.isLoading)

	const handleProcessSelections = async () => {
		try {
			const summary = getSelectionSummary()
			setLoading(true)
			const response = await resultService.processQuestions({
				question_ids: summary.counts.selectedQuestionsData,
				pdf_name: summary.counts.selectedPDFData || '',
			})

			setResults(response, summary.counts.selectedPDFData || '')
			message.success(t('home.error.success'))
			navigate({ to: '/results' })
		} catch (error) {
			message.error(t('home.error.processQuestions'))
			console.error('Processing error:', error)
		} finally {
			setLoading(false)
		}
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
						{t('home.title')}
					</Title>
				</Flex>

				{error && (
					<Alert
						message={t('home.error.loadData')}
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
								{t('home.retry')}
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
						loading={isProcessing}
					>
						{t('home.processButton')}
					</Button>
				</Flex>
			</>
		</div>
	)
}
