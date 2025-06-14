import React from 'react'
import { Button, Dropdown, MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const FlagImage = styled.img`
	width: 15px;
	height: 15px;
	object-fit: cover;
	border-radius: 2px;
	vertical-align: middle;
	margin-right: 4px;
`

const MenuItemContent = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`

export const LanguageSwitcher: React.FC = () => {
	const { i18n } = useTranslation()

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng)
	}

	const getFlagImg = (lang: string) => (
		<FlagImage
			src={`/${lang}-flag.svg`}
			alt={`${lang} flag`}
		/>
	)

	const items: MenuProps['items'] = [
		{
			key: 'en',
			label: (
				<MenuItemContent>
					{getFlagImg('en')}
					<span>English</span>
				</MenuItemContent>
			),
			onClick: () => changeLanguage('en'),
		},
		{
			key: 'tr',
			label: (
				<MenuItemContent>
					{getFlagImg('tr')}
					<span>Türkçe</span>
				</MenuItemContent>
			),
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
