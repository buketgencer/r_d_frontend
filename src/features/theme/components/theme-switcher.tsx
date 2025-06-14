import {
	SunOutlined,
	MoonOutlined,
	CloudOutlined,
	CloudFilled,
} from '@ant-design/icons'
import { Button, Dropdown, MenuProps } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ThemeName } from '../utils/types'
import { useTheme } from '../utils/useTheme'

type ThemeMenuItem = Required<MenuProps>['items'][number] & {
	label: string
}

export const ThemeSwitcher: React.FC = () => {
	const { currentTheme, setTheme } = useTheme()
	const { t } = useTranslation()

	const getThemeIcon = (theme: ThemeName) => {
		switch (theme) {
			case 'light':
				return <SunOutlined />
			case 'dark':
				return <MoonOutlined />
			case 'light-breeze':
				return <CloudOutlined />
			case 'midnight-breeze':
				return <CloudFilled />
			default:
				return <SunOutlined />
		}
	}

	const items: ThemeMenuItem[] = [
		{
			key: 'light',
			icon: getThemeIcon('light'),
			label: t('theme.light'),
			onClick: () => setTheme('light'),
		},
		{
			key: 'dark',
			icon: getThemeIcon('dark'),
			label: t('theme.dark'),
			onClick: () => setTheme('dark'),
		},
		{
			key: 'light-breeze',
			icon: getThemeIcon('light-breeze'),
			label: t('theme.lightBreeze'),
			onClick: () => setTheme('light-breeze'),
		},
		{
			key: 'midnight-breeze',
			icon: getThemeIcon('midnight-breeze'),
			label: t('theme.midnightBreeze'),
			onClick: () => setTheme('midnight-breeze'),
		},
	]

	return (
		<Dropdown
			menu={{ items }}
			trigger={['click']}
		>
			<Button
				size='middle'
				icon={getThemeIcon(currentTheme)}
				variant='text'
				color='default'
			>
				{items.find((item) => item?.key === currentTheme)?.label}
			</Button>
		</Dropdown>
	)
}
