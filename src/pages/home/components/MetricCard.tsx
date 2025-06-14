// components/MetricCard.tsx
import React from 'react'
import { Card, Statistic, Skeleton } from 'antd'
import { MetricCardProps } from '../types/systemMetrics'

export const MetricCard: React.FC<MetricCardProps> = ({
	title,
	value,
	icon,
	color,
	loading = false,
}) => {
	return (
		<Card
			hoverable
			style={{
				borderRadius: 12,
				boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
				border: `2px solid ${color}20`,
			}}
		>
			{loading ? (
				<Skeleton
					active
					paragraph={{ rows: 2 }}
				/>
			) : (
				<Statistic
					title={
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								fontSize: '14px',
								fontWeight: 500,
								color: '#666',
							}}
						>
							<span style={{ color }}>{icon}</span>
							{title}
						</div>
					}
					value={value}
					valueStyle={{
						color,
						fontSize: '32px',
						fontWeight: 'bold',
						lineHeight: 1.2,
					}}
				/>
			)}
		</Card>
	)
}
