import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { Text } from 'react-native';
import { MemoryRouter } from 'react-router';

import Plugin from '../../../';
import { MainNavigatorContext } from '../../../components';
import { useLocation } from '../../../lib';
import { ModalNavigator } from '../ModalNavigator';

jest.mock('../../../lib');

// const createRouterContext = require('react-router-test-context').default;

const mainNavigator = {
	initialRouteName: 'Root',
	routes: [
		{
			name: 'Root',
			navigationOptions: { header: null },
			navigator: {
				initialRouteName: 'Settings',
				type: 'stack',
				mode: 'modal',

				routes: [
					{
						name: 'Main',
						path: '/main',
						navigationOptions: {},

						navigator: {
							type: 'stack',

							routes: [
								{
									name: 'Home',
									path: '/',
									exact: true,
									screen: 'HomeScreen',
									navigationOptions: {},
								},
								{
									name: 'About',
									path: '/about',
									exact: true,
									screen: 'EmptyState',
									navigationOptions: {},
								},
							],
						},
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
			},
			path: '/', //
		},
	],
	type: 'stack',
};

describe('ModalNavigator', () => {
	it('should render a Dialog', async () => {
		(useLocation as jest.Mock).mockImplementation(() => ({
			hash: '',
			key: 'u2vxal',
			pathname: '/p/settings/foo',
			search: '',
			state: {
				id: 'foo',
			},
		}));

		const wrapper = mount(
			<MemoryRouter>
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<MainNavigatorContext.Provider value={mainNavigator as any}>
						<ModalNavigator
							routes={mainNavigator.routes[0].navigator.routes as any}
							screenProps={{} as any}
						>
							<Text testID="modal-children">Modal Child</Text>
						</ModalNavigator>
					</MainNavigatorContext.Provider>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, ModalNavigator);

		expect(wrapper.find('Dialog').exists()).toBe(true);
	});

	it('should render a Dialog with a referrer', async () => {
		(useLocation as jest.Mock).mockImplementation(() => ({
			hash: '',
			key: 'u2vxal',
			pathname: '/p/settings/foo',
			search: '',
			state: {
				id: 'foo',
				__referrer: {
					hash: '',
					key: 'u2vfsl',
					pathname: '/main/about',
					search: '',
					state: {},
				},
			},
		}));

		const wrapper = mount(
			<MemoryRouter>
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<MainNavigatorContext.Provider value={mainNavigator as any}>
						<ModalNavigator
							routes={mainNavigator.routes[0].navigator.routes as any}
							screenProps={{} as any}
						>
							<Text testID="modal-children">Modal Child</Text>
						</ModalNavigator>
					</MainNavigatorContext.Provider>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, ModalNavigator);

		expect(wrapper.find('Dialog').exists()).toBe(true);
		// expect(wrapper.find('EmptyState').exists()).toBe(true);
	});

	it('should not render a Dialog for initial route', async () => {
		(useLocation as jest.Mock).mockImplementation(() => ({
			hash: '',
			key: 'u2vxal',
			pathname: '/p/settings',
			search: '',
			state: {},
		}));

		const wrapper = mount(
			<MemoryRouter>
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<MainNavigatorContext.Provider value={mainNavigator as any}>
						<ModalNavigator
							initialRouteName="Settings"
							routes={mainNavigator.routes[0].navigator.routes as any}
							screenProps={{} as any}
						>
							<Text testID="modal-children">Modal Child</Text>
						</ModalNavigator>
					</MainNavigatorContext.Provider>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, ModalNavigator);

		expect(wrapper.find('Dialog').exists()).toBe(false);
	});

	it('should use first route as inital route if initialRouteName is not set', async () => {
		(useLocation as jest.Mock).mockImplementation(() => ({
			hash: '',
			key: 'u2vxal',
			pathname: '/main',
			search: '',
			state: {},
		}));

		const wrapper = mount(
			<MemoryRouter>
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<MainNavigatorContext.Provider value={mainNavigator as any}>
						<ModalNavigator
							routes={mainNavigator.routes[0].navigator.routes as any}
							screenProps={{} as any}
						>
							<Text testID="modal-children">Modal Child</Text>
						</ModalNavigator>
					</MainNavigatorContext.Provider>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, ModalNavigator);

		expect(wrapper.find('Dialog').exists()).toBe(false);
	});
});
