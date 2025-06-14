import { Layout as AntLayout } from 'antd'
import React from 'react'
import styled from 'styled-components'
import {
	AppHeader,
	ResizableSidebar,
	useSidebarState,
} from '@/layout/home-layout'

const { Content, Footer } = AntLayout

const StyledContent = styled(Content)`
	padding: 24px;
	margin: 0;
	min-height: 280px;
`

const StyledFooter = styled(Footer)`
	text-align: center;
	padding: 16px;
	background-color: ${(props) => props.theme.colorBgContainer};
	border-top: 1px solid ${(props) => props.theme.colorBorder};
	z-index: 100;
`

interface LayoutProps {
	defaultSidebarWidth?: number
	minSidebarWidth?: number
	maxSidebarWidth?: number
	children?: React.ReactNode
}

export const AppLayout: React.FC<LayoutProps> = ({
	defaultSidebarWidth = 200,
	minSidebarWidth = 120,
	maxSidebarWidth = 600,
	children,
}) => {
	const { collapsed, setCollapsed, siderWidth, isDragging, startResizing } =
		useSidebarState({
			defaultWidth: defaultSidebarWidth,
			minWidth: minSidebarWidth,
			maxWidth: maxSidebarWidth,
		})

	return (
		<AntLayout>
			<AntLayout
				style={{ minHeight: '100vh' }}
				hasSider={true}
			>
				<ResizableSidebar
					collapsed={collapsed}
					siderWidth={siderWidth}
					isDragging={isDragging}
					startResizing={startResizing}
					collapsedWidth={0}
					handleWidth={3}
				/>
				<AntLayout>
					<AppHeader
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
					<StyledContent>{children}</StyledContent>
				</AntLayout>
			</AntLayout>
			<StyledFooter>
				© {new Date().getFullYear()} All rights reserved.
			</StyledFooter>
		</AntLayout>
	)
}
