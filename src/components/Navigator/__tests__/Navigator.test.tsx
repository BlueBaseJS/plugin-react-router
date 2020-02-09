import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { MainNavigatorContext } from '../..';
import { MemoryRouter } from 'react-router';
import { Navigator } from '../Navigator';
import Plugin from '../../..';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('../../../lib');

const mainNavigator = {
	initialRouteName: 'Home',
	type: 'stack',

	routes: [
		{
			name: 'Home',
			path: '/home',
			exact: true,
			screen: 'HomeScreen',
			navigationOptions: {},
		},
		{
			exact: true,
			name: 'Settings',
			navigationOptions: {},
			path: '/p/settings',
			screen: 'SettingsScreen',
		},
		{
			name: 'SettingsDetail',
			navigationOptions: {},
			path: '/p/settings/:id',
			screen: 'SettingsDetail',
		},
	],
};

describe('Navigator', () => {
	it('should render a Navigator', async () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/home']}>
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<MainNavigatorContext.Provider value={mainNavigator as any}>
						<Navigator {...(mainNavigator as any)} />
					</MainNavigatorContext.Provider>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, Navigator);

		expect(wrapper.find(Navigator).exists()).toBe(true);
		expect(wrapper.find('HomeScreen').exists()).toBe(true);
	});

	it('should render nothing for unknown navigator', async () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/home']}>
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<MainNavigatorContext.Provider value={mainNavigator as any}>
						<Navigator {...(mainNavigator as any)} type="unknown" />
					</MainNavigatorContext.Provider>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, Navigator);

		expect(wrapper.find(Navigator).children()).toHaveLength(0);
	});

	it('should auto select an initial route', async () => {
		const wrapper = mount(
			<MemoryRouter>
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<MainNavigatorContext.Provider value={mainNavigator as any}>
						<Navigator {...(mainNavigator as any)} initialRouteName={undefined} />
					</MainNavigatorContext.Provider>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, Navigator);

		expect(wrapper.find('Redirect[routeName="Home"]').exists()).toBe(true);
	});
});
