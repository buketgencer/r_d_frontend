// components/AppHeader.tsx
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Button, Space } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { LanguageSwitcher } from '@/features/language-switcher'
import { ThemeSwitcher } from '@/features/theme'

const { Header } = Layout

const StyledHeader = styled(Header)`
	padding: 0 16px;
	background-color: ${(props) => props.theme.colorBgContainer};
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const LeftSection = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`

const ToggleButton = styled(Button)`
	font-size: ${(props) => props.theme.fontSizeLG}px;
	width: 36px;
	height: 36px;
`

interface AppHeaderProps {
	collapsed: boolean
	setCollapsed: (collapsed: boolean) => void
}

export const AppHeader: React.FC<AppHeaderProps> = ({
	collapsed,
	setCollapsed,
}) => {
	return (
		<StyledHeader>
			<LeftSection>
				<ToggleButton
					type='text'
					icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
					onClick={() => setCollapsed(!collapsed)}
				/>
				<span style={{ fontSize: '16px', fontWeight: 500 }}>
					Etkin AI Rapor Değerlendirme
				</span>
			</LeftSection>
			<Space size={'small'}>
				<LanguageSwitcher />
				<ThemeSwitcher />
			</Space>
		</StyledHeader>
	)
}
