import React from 'react'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'

interface StatusDotProps {
	status: 'answer_found' | 'answer_notfound'
}

export const StatusDot: React.FC<StatusDotProps> = ({ status }) => {
	const { t } = useTranslation()
	const color = status === 'answer_found' ? '#52c41a' : '#cf1322'
	const tooltip =
		status === 'answer_found'
			? t('results.status.found')
			: t('results.status.notFound')

	return (
		<Tooltip title={tooltip}>
			<div
				style={{
					width: '8px',
					height: '8px',
					borderRadius: '50%',
					backgroundColor: color,
					display: 'inline-block',
					marginRight: '8px',
				}}
			/>
		</Tooltip>
	)
}
