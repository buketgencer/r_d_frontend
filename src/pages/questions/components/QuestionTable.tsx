import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Table, Button, Space, Popconfirm, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useTranslation } from 'react-i18next'
import { Question } from '../types'

const { Text } = Typography

interface QuestionTableProps {
	questions: Question[]
	loading: boolean
	onView: (question: Question) => void
	onEdit: (question: Question) => void
	onDelete: (id: string) => void
}

export const QuestionTable: React.FC<QuestionTableProps> = ({
	questions,
	loading,
	onView,
	onEdit,
	onDelete,
}) => {
	const { t } = useTranslation()

	const columns: ColumnsType<Question> = [
		{
			title: t('questions.table.title'),
			dataIndex: 'soru',
			key: 'soru',
			render: (text: string) => (
				<Text ellipsis={{ tooltip: text }}>{text}</Text>
			),
		},
		{
			title: t('questions.table.actions'),
			key: 'actions',
			width: 150,
			render: (_, record) => (
				<Space size='small'>
					<Button
						type='text'
						icon={<EyeOutlined />}
						onClick={(e) => {
							e.stopPropagation()
							onView(record)
						}}
						title={t('questions.table.view')}
					/>
					<Button
						type='text'
						icon={<EditOutlined />}
						onClick={(e) => {
							e.stopPropagation()
							onEdit(record)
						}}
						title={t('questions.table.edit')}
					/>
					<Popconfirm
						title={t('questions.modals.delete.title')}
						description={t('questions.modals.delete.description')}
						onConfirm={(e) => {
							e?.stopPropagation()
							onDelete(record.id)
						}}
						okText={t('questions.modals.delete.confirm')}
						cancelText={t('questions.modals.delete.cancel')}
						onCancel={(e) => e?.stopPropagation()}
					>
						<Button
							type='text'
							danger
							icon={<DeleteOutlined />}
							onClick={(e) => e.stopPropagation()}
							title={t('questions.table.delete')}
						/>
					</Popconfirm>
				</Space>
			),
		},
	]

	return (
		<Table
			columns={columns}
			dataSource={questions}
			rowKey='id'
			loading={loading}
			pagination={{
				pageSize: 10,
				showSizeChanger: true,
				showQuickJumper: true,
				showTotal: (total, range) =>
					t('questions.table.pagination.range', {
						from: range[0],
						to: range[1],
						total,
					}),
			}}
			locale={{
				emptyText: t('questions.table.empty'),
			}}
		/>
	)
}
