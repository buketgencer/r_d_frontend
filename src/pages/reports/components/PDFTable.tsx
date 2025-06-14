import React from 'react'
import { Table, Button, Space, Popconfirm } from 'antd'
import {
	DownloadOutlined,
	EyeOutlined,
	DeleteOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { usePDFs } from '../hooks/usePDFs'

export const PDFTable: React.FC = () => {
	const { pdfs, loading, downloadPDF, previewPDF, deletePDF } = usePDFs()
	const { t } = useTranslation()

	const columns = [
		{
			title: t('reports.table.filename'),
			dataIndex: 'filename',
			key: 'filename',
		},
		{
			title: t('reports.table.actions'),
			key: 'actions',
			width: 150,
			render: (_: any, record: { filename: string }) => (
				<Space size='small'>
					<Button
						type='text'
						icon={<EyeOutlined />}
						onClick={() => previewPDF(record.filename)}
						title={t('reports.table.view')}
					/>
					<Button
						type='text'
						icon={<DownloadOutlined />}
						onClick={() => downloadPDF(record.filename)}
						title={t('reports.table.download')}
					/>
					<Popconfirm
						title={t('reports.table.delete')}
						description={t('reports.messages.deleteConfirm')}
						onConfirm={() => deletePDF(record.filename)}
						okText={t('common.yes')}
						cancelText={t('common.no')}
					>
						<Button
							type='text'
							danger
							icon={<DeleteOutlined />}
							title={t('reports.table.delete')}
						/>
					</Popconfirm>
				</Space>
			),
		},
	]

	return (
		<Table
			columns={columns}
			dataSource={pdfs.map((filename) => ({ key: filename, filename }))}
			loading={loading}
			pagination={false}
			locale={{ emptyText: t('reports.table.noData') }}
		/>
	)
}
