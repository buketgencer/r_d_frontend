// components/SystemMetrics.tsx
import {
	ReloadOutlined,
	QuestionCircleOutlined,
	FileTextOutlined,
} from '@ant-design/icons'
import { Row, Col, Button, Alert, Space, Typography } from 'antd'
import React from 'react'
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
						System Metrics{' '}
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
					Refresh
				</Button>
			</div>

			{error && (
				<Alert
					message='Failed to load metrics'
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
							Retry
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
						title='Total Questions'
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
						title='Total PDF Files'
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
						title='Total Items'
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
