import React from 'react'
import { Button, Dropdown, MenuProps, Space } from 'antd'
import { useTranslation } from 'react-i18next'

export const LanguageSwitcher: React.FC = () => {
	const { i18n } = useTranslation()

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng)
	}

	const getFlagImg = (lang: string) => (
		<img
			src={`/${lang}-flag.svg`}
			alt={`${lang} flag`}
			style={{
				width: 15,
				height: 15,
				objectFit: 'cover',
				borderRadius: 2,
			}}
		/>
	)

	const items: MenuProps['items'] = [
		{
			key: 'en',
			icon: getFlagImg('en'),
			label: 'English',
			onClick: () => changeLanguage('en'),
		},
		{
			key: 'tr',
			icon: getFlagImg('tr'),
			label: 'Türkçe',
			onClick: () => changeLanguage('tr'),
		},
	]

	const currentLang = i18n.language

	return (
		<Dropdown
			menu={{ items }}
			trigger={['click']}
		>
			<Button
				size='middle'
				icon={getFlagImg(currentLang)}
				variant='text'
				color='default'
			>
				{currentLang === 'en' ? 'English' : 'Türkçe'}
			</Button>
		</Dropdown>
	)
}
