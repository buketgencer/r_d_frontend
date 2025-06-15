// components/PDFSelection.tsx
import {
	FileTextOutlined,
	ClearOutlined,
	FilePdfOutlined,
} from '@ant-design/icons'
import { Card, Radio, List, Typography, Space, Button } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PDFSelectionProps } from '../types/selection'

const { Title, Text } = Typography

export const PDFSelection: React.FC<PDFSelectionProps> = ({
	pdfFiles,
	selectedPDF,
	onSelectionChange,
	loading = false,
}) => {
	const { t } = useTranslation()
	const handlePDFChange = (filename: string) => {
		// If the same PDF is clicked, deselect it
		const newSelection = selectedPDF === filename ? null : filename
		onSelectionChange(newSelection)
	}

	const handleClear = () => {
		onSelectionChange(null)
	}

	return (
		<Card
			title={
				<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
					<FileTextOutlined />
					<Title
						level={4}
						style={{ margin: 0 }}
					>
						{t('home.pdfSelection.title')}
					</Title>
				</div>
			}
			extra={
				<Space>
					<Text
						type='secondary'
						ellipsis
						style={{ maxWidth: '120px' }}
						title={selectedPDF || ''}
					>
						{selectedPDF}
					</Text>
					{selectedPDF && (
						<Button
							size='small'
							icon={<ClearOutlined />}
							onClick={handleClear}
							type='link'
						>
							{t('home.pdfSelection.clear')}
						</Button>
					)}
				</Space>
			}
			style={{ marginBottom: 24 }}
			loading={loading}
		>
			<div style={{ marginBottom: 16 }}>
				<Text type='secondary'>{t('home.pdfSelection.selectHint')}</Text>
			</div>

			<Radio.Group
				value={selectedPDF}
				onChange={(e) => onSelectionChange(e.target.value)}
				style={{ width: '100%' }}
			>
				<List
					dataSource={pdfFiles}
					renderItem={(filename) => (
						<List.Item
							style={{
								padding: '12px 0',
								cursor: 'pointer',
							}}
							onClick={() => handlePDFChange(filename)}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									width: '100%',
									padding: '8px',
									borderRadius: '4px',
									transition: 'all 0.3s ease',
								}}
							>
								<Radio
									value={filename}
									style={{ marginRight: 12 }}
								>
									<div
										style={{ display: 'flex', alignItems: 'center', gap: 8 }}
									>
										<FilePdfOutlined style={{ fontSize: '16px' }} />
										<div>
											<div style={{ fontWeight: 500 }}>{filename}</div>
											<Text
												type='secondary'
												style={{ fontSize: '12px' }}
											>
												{t('home.pdfSelection.documentType')}
											</Text>
										</div>
									</div>
								</Radio>
							</div>
						</List.Item>
					)}
					locale={{
						emptyText: loading
							? t('home.pdfSelection.loading')
							: t('home.pdfSelection.noFiles'),
					}}
					style={{
						minHeight: '300px',
						maxHeight: '400px',
						overflowY: 'auto',
					}}
				/>
			</Radio.Group>
		</Card>
	)
}
