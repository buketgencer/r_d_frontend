import { Layout } from 'antd'
import React from 'react'
import styled from 'styled-components'
import {
	AppHeader,
	ResizableSidebar,
	useSidebarState,
} from '@/layout/home-layout'

const { Content } = Layout

const StyledContent = styled(Content)`
	padding: 24px;
	margin: 0;
	min-height: 280px;
`

interface HomeProps {
	defaultSidebarWidth?: number
	minSidebarWidth?: number
	maxSidebarWidth?: number
}

export const Home: React.FC<HomeProps> = ({
	defaultSidebarWidth = 200,
	minSidebarWidth = 120,
	maxSidebarWidth = 600,
}) => {
	const { collapsed, setCollapsed, siderWidth, isDragging, startResizing } =
		useSidebarState({
			defaultWidth: defaultSidebarWidth,
			minWidth: minSidebarWidth,
			maxWidth: maxSidebarWidth,
		})


	return (
		<Layout>
			<Layout
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
				<Layout>
					<AppHeader
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
					<StyledContent>
					</StyledContent>
				</Layout>
			</Layout>
		</Layout>
	)
}
