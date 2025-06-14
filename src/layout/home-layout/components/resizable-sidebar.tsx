import {
	FileTextOutlined,
	HomeOutlined,
	QuestionCircleOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Layout, Menu } from 'antd'
import React from 'react'
import styled from 'styled-components'

const { Sider } = Layout

const StyledSider = styled(Sider)<{ $isDragging: boolean }>`
	position: relative;
	height: 100vh;
	position: sticky;
	inset-inline-start: 0;
	width: 100%;
	top: 0;
	bottom: 0;
	scrollbar-width: thin;
	scrollbar-gutter: 0;
	border-right: 1px solid ${(props) => props.theme.colorBorder};
	transition: ${(props) =>
		props.$isDragging ? 'none !important' : 'all 0.2s'};
	background-color: ${(props) => props.theme.colorBgContainer};
`

const ResizeHandle = styled.div<{ $width: number }>`
	position: absolute;
	top: 0;
	right: 0;
	width: ${(props) => props.$width}px;
	height: 100%;
	background: transparent;
	cursor: ew-resize;
	z-index: 100;
	&:hover {
		background: ${(props) => props.theme.colorPrimary};
		opacity: 0.2;
	}
`

const SidebarPlaceholder = styled.div`
	padding: 16px;
	color: ${(props) => props.theme.colorTextSecondary};
	font-size: 12px;
	text-align: center;
	border-bottom: 1px solid ${(props) => props.theme.colorBorder};
`

interface ResizableSidebarProps {
	collapsed: boolean
	siderWidth: number
	isDragging: boolean
	startResizing: (e: React.MouseEvent) => void
	collapsedWidth?: number
	handleWidth?: number
}

export const ResizableSidebar: React.FC<ResizableSidebarProps> = ({
	collapsed,
	siderWidth,
	isDragging,
	startResizing,
	collapsedWidth = 0,
	handleWidth = 3,
}) => {
	return (
		<>
			<StyledSider
				trigger={null}
				collapsible
				collapsed={collapsed}
				collapsedWidth={collapsedWidth}
				width={siderWidth}
				$isDragging={isDragging}
			>
				{<SidebarPlaceholder>Navigation Menu</SidebarPlaceholder>}
				<SidebarMenu />
				{!collapsed && (
					<ResizeHandle
						$width={handleWidth}
						onMouseDown={startResizing}
					/>
				)}
			</StyledSider>
		</>
	)
}

const SidebarMenu: React.FC = () => {
	return (
		<Menu
			mode='inline'
			defaultSelectedKeys={['home']}
			style={{
				height: '100vh',
				border: 'none',
				overflowY: 'auto',
				scrollbarWidth: 'thin',
				scrollbarGutter: 'stable',
				width: '100%',
				paddingLeft: 12,
				paddingTop: 16,
			}}
			items={[
				{
					key: 'home',
					icon: <HomeOutlined />,
					label: <Link to='/'>Ana Sayfa</Link>,
				},
				{
					key: 'pdfs',
					icon: <FileTextOutlined />,
					label: <Link to='/rd-report-documents'>Raporlar</Link>,
				},
				{
					key: 'questions',
					icon: <QuestionCircleOutlined />,
					label: <Link to='/questions'>Sorular</Link>,
				},
			]}
		/>
	)
}
