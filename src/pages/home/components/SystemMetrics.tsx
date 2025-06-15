// components/SystemMetrics.tsx
import {
	ReloadOutlined,
	QuestionCircleOutlined,
	FileTextOutlined,
} from '@ant-design/icons'
import { Row, Col, Button, Alert, Space, Typography } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MetricCard } from './MetricCard'

const { Title } = Typography

interface SystemMetricsProps {
	refreshMetrics: () => void
	totalQuestions: number
	totalFiles: number
	isLoading: boolean
	error: string | null
}

export const SystemMetrics: React.FC<SystemMetricsProps> = ({
	refreshMetrics,
	totalQuestions,
	totalFiles,
	isLoading,
	error,
}) => {
	const { t } = useTranslation()

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '24px',
				}}
			>
				<Space>
					<Title
						level={3}
						style={{ margin: 0 }}
					>
						{t('home.systemMetrics.title')}{' '}
						<Space>
							<span style={{ color: '#666', fontSize: '12px' }}>
								Last updated: {new Date().toLocaleTimeString()}
							</span>
						</Space>
					</Title>
				</Space>
				<Button
					icon={<ReloadOutlined />}
					onClick={refreshMetrics}
					loading={isLoading}
					type='default'
				>
					{t('home.systemMetrics.refresh')}
				</Button>
			</div>

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
							onClick={refreshMetrics}
						>
							{t('home.retry')}
						</Button>
					}
				/>
			)}

			<Row gutter={[24, 24]}>
				<Col
					xs={24}
					sm={12}
					lg={8}
				>
					<MetricCard
						title={t('home.systemMetrics.totalQuestions')}
						value={totalQuestions}
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
						title={t('home.systemMetrics.totalFiles')}
						value={totalFiles}
						icon={<FileTextOutlined />}
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
						title={t('home.systemMetrics.totalItems')}
						value={totalQuestions + totalFiles}
						icon={<FileTextOutlined />}
						color='#722ed1'
						loading={isLoading}
					/>
				</Col>
			</Row>
		</>
	)
}
