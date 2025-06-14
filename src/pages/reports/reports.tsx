import { PlusOutlined } from '@ant-design/icons'
import { Typography, Button } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PDFTable } from './components/PDFTable'
import { UploadModal } from './components/UploadModal'
import { usePDFs } from './hooks/usePDFs'

const { Title } = Typography

export const Reports: React.FC = () => {
	const { t } = useTranslation()
	const { pdfs, loading, uploadPDF, deletePDF, downloadPDF, previewPDF } =
		usePDFs()
	const [uploadModalVisible, setUploadModalVisible] = useState(false)

	const handleUpload = () => {
		setUploadModalVisible(true)
	}

	const handleUploadModalClose = () => {
		setUploadModalVisible(false)
	}

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '16px',
				}}
			>
				<Title
					level={2}
					style={{ margin: 0 }}
				>
					{t('reports.title')}
				</Title>
				<Button
					type='primary'
					icon={<PlusOutlined />}
					onClick={handleUpload}
				>
					{t('reports.addNew')}
				</Button>
			</div>
			<PDFTable
				pdfs={pdfs}
				loading={loading}
				downloadPDF={downloadPDF}
				previewPDF={previewPDF}
				deletePDF={deletePDF}
			/>
			<UploadModal
				visible={uploadModalVisible}
				onClose={handleUploadModalClose}
				onSubmit={uploadPDF}
			/>
		</>
	)
}
