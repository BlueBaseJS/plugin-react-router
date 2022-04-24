import { NavigatorProps } from '@bluebase/components';
import { BlueBaseApp, BlueBaseAppErrorProps } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { MemoryRouter } from 'react-router';

import Plugin from '../../../index';
import { MainNavigatorContext } from '../../index';
import { Navigator } from '../Navigator';

jest.mock('../../../lib');

const mainNavigator: NavigatorProps = {
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

const ErrorComponent = ({ error, progress }: BlueBaseAppErrorProps) => {
	if (error) {
		throw error;
	}
	if (progress?.error) {
		throw progress.error;
	}

	return null;
};

describe('Navigator', () => {
	// it('should render a Navigator', async () => {
	// 	const wrapper = mount(
	// 		<MemoryRouter initialEntries={['/home']}>
	// 			<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]} ErrorComponent={ErrorComponent}>
	// 				<MainNavigatorContext.Provider value={mainNavigator}>
	// 					<Navigator
	// 						{...{
	// 							type: 'stack',

	// 							routes: [
	// 								{
	// 									name: 'Test',
	// 									path: '/test',
	// 									exact: true,
	// 									screen: 'EmptyState',
	// 									options: {},
	// 								},
	// 							],
	// 						}}
	// 						standalone={false}
	// 					/>
	// 				</MainNavigatorContext.Provider>
	// 			</BlueBaseApp>
	// 		</MemoryRouter>
	// 	);

	// 	await waitForElement(wrapper, Navigator);

	// 	expect(wrapper.find(Navigator).exists()).toBe(true);
	// 	expect(wrapper.find('HomeScreen').exists()).toBe(true);
	// });

	// it('should render a Navigator in standalone mode', async () => {
	// 	const wrapper = mount(
	// 		<MemoryRouter initialEntries={['/home']}>
	// 			<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]} ErrorComponent={ErrorComponent}>
	// 				<MainNavigatorContext.Provider value={mainNavigator}>
	// 					<Navigator {...mainNavigator} standalone />
	// 				</MainNavigatorContext.Provider>
	// 			</BlueBaseApp>
	// 		</MemoryRouter>
	// 	);

	// 	await waitForElement(wrapper, Navigator);

	// 	expect(wrapper.find(Navigator)).toMatchSnapshot();
	// 	expect(wrapper.find(Navigator).exists()).toBe(true);
	// 	expect(wrapper.find('HomeScreen').exists()).toBe(true);
	// });

	it('should render nothing for unknown navigator', async () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/home']}>
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]} ErrorComponent={ErrorComponent}>
					<MainNavigatorContext.Provider value={mainNavigator as any}>
						<Navigator {...(mainNavigator as any)} type="unknown" />
					</MainNavigatorContext.Provider>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, Navigator);

		expect(wrapper.find('NavigatorInternal').children()).toHaveLength(0);
	});

	// it('should auto select an initial route', async () => {
	// 	const wrapper = mount(
	// 		<MemoryRouter>
	// 			<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]} ErrorComponent={ErrorComponent}>
	// 				<MainNavigatorContext.Provider value={mainNavigator}>
	// 					<Navigator {...mainNavigator} standalone={false} initialRouteName={undefined} />
	// 				</MainNavigatorContext.Provider>
	// 			</BlueBaseApp>
	// 		</MemoryRouter>
	// 	);

	// 	await waitForElement(wrapper, Navigator);

	// 	expect(wrapper.find('Redirect[routeName="Home"]').exists()).toBe(true);
	// });

	it('should handle empty routes gracefully', async () => {
		const wrapper = mount(
			<MemoryRouter>
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]} ErrorComponent={ErrorComponent}>
					<MainNavigatorContext.Provider value={mainNavigator as any}>
						<Navigator {...({ type: 'stack' } as any)} />
					</MainNavigatorContext.Provider>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, Navigator);

		expect(wrapper.find(Navigator).exists()).toBe(true);
		expect(wrapper.find('Route').exists()).toBe(false);
	});
});
