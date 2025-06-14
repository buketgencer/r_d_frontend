import { InboxOutlined } from '@ant-design/icons'
import { Modal, Upload, Button, message } from 'antd'
import type { UploadFile, RcFile } from 'antd/es/upload/interface'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const { Dragger } = Upload

interface UploadModalProps {
	visible: boolean
	onClose: () => void
	onSubmit: (file: File) => Promise<boolean>
}

export const UploadModal = ({
	visible,
	onClose,
	onSubmit,
}: UploadModalProps) => {
	const { t } = useTranslation()
	const [fileList, setFileList] = useState<UploadFile[]>([])
	const [uploading, setUploading] = useState(false)

	const handleUpload = async () => {
		if (fileList.length === 0) {
			message.error(t('reports.messages.noFileSelected'))
			return
		}

		const file = fileList[0].originFileObj
		if (!file) {
			message.error(t('reports.messages.noFileSelected'))
			return
		}

		setUploading(true)
		try {
			const success = await onSubmit(file)
			if (success) {
				setFileList([])
				onClose()
			}
		} catch (error) {
			if (error instanceof Error) {
				message.error(error.message)
			} else {
				message.error(t('reports.messages.uploadError'))
			}
			console.error('Upload error:', error)
		} finally {
			setUploading(false)
		}
	}

	const handleCancel = () => {
		setFileList([])
		onClose()
	}

	const beforeUpload = (file: RcFile) => {
		const isPDF = file.type === 'application/pdf'
		if (!isPDF) {
			message.error(t('reports.messages.onlyPDF'))
			return false
		}
		setFileList([
			{
				uid: '-1',
				name: file.name,
				status: 'done',
				url: '',
				originFileObj: file,
			},
		])
		return false
	}

	const uploadProps = {
		name: 'file',
		multiple: false,
		fileList,
		beforeUpload,
		onRemove: () => setFileList([]),
		accept: '.pdf',
		showUploadList: true,
	}

	return (
		<Modal
			title={t('reports.addNew')}
			open={visible}
			onCancel={handleCancel}
			footer={[
				<Button
					key='cancel'
					onClick={handleCancel}
				>
					{t('questions.modals.add.cancel')}
				</Button>,
				<Button
					key='upload'
					type='primary'
					loading={uploading}
					onClick={handleUpload}
					disabled={fileList.length === 0}
				>
					{t('reports.addNew')}
				</Button>,
			]}
		>
			<Dragger {...uploadProps}>
				<p className='ant-upload-drag-icon'>
					<InboxOutlined />
				</p>
				<p className='ant-upload-text'>
					{t(
						'reports.upload.dragText',
						'Click or drag PDF file to this area to upload'
					)}
				</p>
				<p className='ant-upload-hint'>
					{t(
						'reports.upload.hint',
						'Only PDF files are allowed. Maximum file size: 10MB.'
					)}
				</p>
			</Dragger>
		</Modal>
	)
}
