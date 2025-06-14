import { Modal, Form, Input, Typography, FormInstance } from 'antd'
import { useTranslation } from 'react-i18next'
import { Question, QuestionCreate } from '../types'

const { Title, Text } = Typography
const { TextArea } = Input

interface ViewModalProps {
	visible: boolean
	question: Question | null
	onClose: () => void
}

export const ViewModal: React.FC<ViewModalProps> = ({
	visible,
	question,
	onClose,
}) => {
	const { t } = useTranslation()

	return (
		<Modal
			title={t('questions.modals.view.title')}
			open={visible}
			onCancel={onClose}
			footer={null}
			width={600}
		>
			{question && (
				<div style={{ padding: '16px 0' }}>
					<div style={{ marginBottom: '16px' }}>
						<Title level={4}>{t('questions.modals.view.question')}:</Title>
						<Text>{question.soru}</Text>
					</div>

					{question.yordam && (
						<div>
							<Title level={4}>{t('questions.modals.view.procedure')}:</Title>
							<Text>{question.yordam}</Text>
						</div>
					)}

					{!question.yordam && (
						<div>
							<Title level={4}>{t('questions.modals.view.procedure')}:</Title>
							<Text
								type='secondary'
								italic
							>
								{t('questions.modals.view.noProcedure')}
							</Text>
						</div>
					)}
				</div>
			)}
		</Modal>
	)
}

interface QuestionFormProps {
	form: FormInstance<QuestionCreate>
	onSubmit: (values: QuestionCreate) => Promise<boolean>
	initialValues?: QuestionCreate
}

const QuestionForm: React.FC<QuestionFormProps> = ({
	form,
	onSubmit,
	initialValues,
}) => {
	const { t } = useTranslation()

	return (
		<Form
			form={form}
			layout='vertical'
			style={{ marginTop: '16px' }}
			initialValues={initialValues}
			onFinish={onSubmit}
		>
			<Form.Item
				name='soru'
				label={t('questions.form.question.label')}
				rules={[
					{ required: true, message: t('questions.form.question.required') },
					{ min: 1, message: t('questions.form.question.empty') },
				]}
			>
				<TextArea
					rows={4}
					placeholder={t('questions.form.question.placeholder')}
				/>
			</Form.Item>

			<Form.Item
				name='yordam'
				label={t('questions.form.procedure.label')}
			>
				<TextArea
					rows={4}
					placeholder={t('questions.form.procedure.placeholder')}
				/>
			</Form.Item>
		</Form>
	)
}

interface AddModalProps {
	visible: boolean
	onClose: () => void
	onSubmit: (values: QuestionCreate) => Promise<boolean>
}

export const AddModal: React.FC<AddModalProps> = ({
	visible,
	onClose,
	onSubmit,
}) => {
	const { t } = useTranslation()
	const [form] = Form.useForm()

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields()
			const success = await onSubmit(values)
			if (success) {
				form.resetFields()
				onClose()
			}
		} catch (error) {
			console.error('Form validation failed:', error)
		}
	}

	return (
		<Modal
			title={t('questions.modals.add.title')}
			open={visible}
			onCancel={onClose}
			onOk={handleSubmit}
			okText={t('questions.modals.add.submit')}
			cancelText={t('questions.modals.add.cancel')}
			width={600}
		>
			<QuestionForm
				form={form}
				onSubmit={onSubmit}
			/>
		</Modal>
	)
}

interface EditModalProps {
	visible: boolean
	question: Question | null
	onClose: () => void
	onSubmit: (id: string, values: QuestionCreate) => Promise<boolean>
}

export const EditModal: React.FC<EditModalProps> = ({
	visible,
	question,
	onClose,
	onSubmit,
}) => {
	const { t } = useTranslation()
	const [form] = Form.useForm()

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields()
			if (question) {
				const success = await onSubmit(question.id, values)
				if (success) {
					form.resetFields()
					onClose()
				}
			}
		} catch (error) {
			console.error('Form validation failed:', error)
		}
	}

	return (
		<Modal
			title={t('questions.modals.edit.title')}
			open={visible}
			onCancel={onClose}
			onOk={handleSubmit}
			okText={t('questions.modals.edit.submit')}
			cancelText={t('questions.modals.edit.cancel')}
			width={600}
		>
			<QuestionForm
				form={form}
				onSubmit={async (values) => {
					if (!question) return false
					return onSubmit(question.id, values)
				}}
				initialValues={question || undefined}
			/>
		</Modal>
	)
}
