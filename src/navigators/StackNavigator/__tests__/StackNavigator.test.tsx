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
import { StackNavigator } from '../StackNavigator';

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
						path: '/p/settings/:pageId',
						screen: 'SettingsDetail',
					},
				],
			},
			path: '/', //
		},
	],
	type: 'stack',
};

describe('StackNavigator', () => {
	it('should render StackNavigator with given children', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<StackNavigator {...({ mode: 'card' } as any)}>
					<Text testID="StackNavigatorChild">Hello there</Text>
				</StackNavigator>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, StackNavigator);

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('StackNavigator [testID="StackNavigatorChild"]')
				.last()
				.text()
		).toBe('Hello there');
	});

	it('should render a ModalNavigator', async () => {
		(useLocation as jest.Mock).mockImplementation(() => ({
			hash: '',
			key: 'u2vxal',
			pathname: '/p/settings/foo',
			search: '',
			state: {
				pageId: 'foo',
			},
		}));

		const wrapper = mount(
			<MemoryRouter>
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<MainNavigatorContext.Provider value={mainNavigator as any}>
						<StackNavigator {...(mainNavigator.routes[0].navigator as any)} screenProps={{} as any}>
							<Text testID="modal-children">Modal Child</Text>
						</StackNavigator>
					</MainNavigatorContext.Provider>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, ModalNavigator);

		expect(wrapper.find('ModalNavigator').exists()).toBe(true);
	});
});
