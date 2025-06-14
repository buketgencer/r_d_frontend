export interface PDFFile {
	filename: string
}

export interface PDFListResponse {
	pdf_files: string[]
	count: number
}

export interface PDFUploadResponse {
	filename: string
	message: string
}

export interface PDFDeleteResponse {
	filename: string
	message: string
}
