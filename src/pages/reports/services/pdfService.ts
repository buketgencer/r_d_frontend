import axios from 'axios'
import { PDFListResponse, PDFUploadResponse, PDFDeleteResponse } from '../types'

const API_BASE = import.meta.env.VITE_API_BASE_URL

export const pdfService = {
	getPDFs: async (): Promise<PDFListResponse> => {
		const response = await axios.get<PDFListResponse>(`${API_BASE}/pdfs`)
		return response.data
	},

	uploadPDF: async (file: File): Promise<PDFUploadResponse> => {
		const formData = new FormData()
		formData.append('file', file)
		const response = await axios.post<PDFUploadResponse>(
			`${API_BASE}/upload-pdf`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		)
		return response.data
	},

	downloadPDF: async (filename: string): Promise<Blob> => {
		const response = await axios.get(`${API_BASE}/pdf/${filename}`, {
			responseType: 'blob',
		})
		return response.data
	},

	deletePDF: async (filename: string): Promise<PDFDeleteResponse> => {
		const response = await axios.delete<PDFDeleteResponse>(
			`${API_BASE}/pdf/${filename}`
		)
		return response.data
	},
}
