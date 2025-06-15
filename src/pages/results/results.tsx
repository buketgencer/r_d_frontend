import {
	FileTextOutlined,
	CheckCircleOutlined,
	CloseCircleOutlined,
	QuestionCircleOutlined,
	CloseOutlined,
} from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import {
	Typography,
	Card,
	List,
	Row,
	Col,
	Divider,
	Spin,
	Alert,
	Space,
	Button,
} from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StatusDot } from './components/StatusDot'
import { MetricCard } from '../home/components/MetricCard'
import { useResultsStore } from '@/store/results'

const { Title, Text } = Typography

export const Results: React.FC = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { results, count, pdfName, isLoading } = useResultsStore()

	const foundAnswers = results.filter((r) => r.status === 'answer_found').length
	const notFoundAnswers = results.filter(
		(r) => r.status === 'answer_notfound'
	).length

	if (isLoading) {
		return (
			<div style={{ textAlign: 'center', padding: '50px' }}>
				<Spin size='large' />
				<Title
					level={4}
					style={{ marginTop: '20px' }}
				>
					{t('results.loading')}
				</Title>
			</div>
		)
	}

	if (results.length === 0) {
		return (
			<div>
				<Alert
					message={t('results.noResults.title')}
					description={t('results.noResults.description')}
					type='info'
					showIcon
				/>
			</div>
		)
	}

	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '24px',
				}}
			>
				<Space
					direction='vertical'
					size={0}
				>
					<Title
						level={3}
						style={{ margin: 0 }}
					>
						{t('results.title')}
					</Title>
					<Text type='secondary'>
						<FileTextOutlined style={{ marginRight: '8px' }} />
						{t('results.pdfInfo', { name: pdfName })}
					</Text>
				</Space>
				<Button
					color='default'
					variant='text'
					size='large'
					icon={<CloseOutlined />}
					onClick={() => navigate({ to: '/' })}
				/>
			</div>

			<Row
				gutter={[24, 24]}
				style={{ marginBottom: '32px' }}
			>
				<Col
					xs={24}
					sm={12}
					lg={8}
				>
					<MetricCard
						title={t('results.metrics.totalQuestions')}
						value={count}
						icon={<QuestionCircleOutlined />}
						color='#1890ff'
						loading={isLoading}
					/>
				</Col>
				<Col
					xs={24}
					sm={12}
					lg={8}
				>
					<MetricCard
						title={t('results.metrics.answersFound')}
						value={foundAnswers}
						icon={<CheckCircleOutlined />}
						color='#52c41a'
						loading={isLoading}
					/>
				</Col>
				<Col
					xs={24}
					sm={12}
					lg={8}
				>
					<MetricCard
						title={t('results.metrics.answersNotFound')}
						value={notFoundAnswers}
						icon={<CloseCircleOutlined />}
						color='#cf1322'
						loading={isLoading}
					/>
				</Col>
			</Row>

			<Divider />

			<List
				itemLayout='vertical'
				dataSource={results}
				renderItem={(result) => (
					<List.Item>
						<Card>
							<div style={{ marginBottom: '16px' }}>
								<Space align='center'>
									<StatusDot status={result.status} />
									<Title
										level={4}
										style={{ margin: 0 }}
									>
										{result.question}
									</Title>
								</Space>
							</div>
							<p>{result.answer}</p>
						</Card>
					</List.Item>
				)}
			/>
		</div>
	)
}
