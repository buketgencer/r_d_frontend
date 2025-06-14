import { useState, useEffect } from 'react'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { pdfService } from '../services/pdfService'
import { PDFUploadResponse } from '../types'
import axios from 'axios'

export const usePDFs = () => {
	const [pdfs, setPDFs] = useState<string[]>([])
	const [loading, setLoading] = useState(true)
	const { t } = useTranslation()

	const fetchPDFs = async () => {
		try {
			setLoading(true)
			const response = await pdfService.getPDFs()
			setPDFs(response.pdf_files)
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.data?.detail) {
				message.error(error.response.data.detail)
			} else {
				message.error(t('reports.messages.loadError'))
			}
			console.error('Error fetching PDFs:', error)
		} finally {
			setLoading(false)
		}
	}

	const uploadPDF = async (file: File): Promise<boolean> => {
		try {
			const response = await pdfService.uploadPDF(file)
			message.success(response.message)
			fetchPDFs()
			return true
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.data?.detail) {
				message.error(error.response.data.detail)
			} else {
				message.error(t('reports.messages.uploadError'))
			}
			console.error('Error uploading PDF:', error)
			return false
		}
	}

	const downloadPDF = async (filename: string) => {
		try {
			const blob = await pdfService.downloadPDF(filename)
			const url = window.URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			link.download = filename
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
			window.URL.revokeObjectURL(url)
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.data?.detail) {
				message.error(error.response.data.detail)
			} else {
				message.error(t('reports.messages.downloadError'))
			}
			console.error('Error downloading PDF:', error)
		}
	}

	const previewPDF = async (filename: string) => {
		try {
			const blob = await pdfService.downloadPDF(filename)
			const url = window.URL.createObjectURL(blob)
			window.open(url, '_blank')
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.data?.detail) {
				message.error(error.response.data.detail)
			} else {
				message.error(t('reports.messages.downloadError'))
			}
			console.error('Error previewing PDF:', error)
		}
	}

	const deletePDF = async (filename: string) => {
		try {
			const response = await pdfService.deletePDF(filename)
			message.success(response.message)
			fetchPDFs()
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.data?.detail) {
				message.error(error.response.data.detail)
			} else {
				message.error(t('reports.messages.deleteError'))
			}
			console.error('Error deleting PDF:', error)
		}
	}

	useEffect(() => {
		fetchPDFs()
	}, [])

	return {
		pdfs,
		loading,
		uploadPDF,
		downloadPDF,
		previewPDF,
		deletePDF,
		refreshPDFs: fetchPDFs,
	}
}
