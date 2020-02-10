import { BlueBaseApp, NavigationContext } from '@bluebase/core';
import { MemoryRouter, Route } from 'react-router';
import { Tab1Screen, Tab2Screen } from '../../../../bluebase/expo/apps/plugin-settings-app/Screens';

import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { MainNavigatorContext } from '../../../components';
import Plugin from '../../..';
import React from 'react';
import { Tab } from '@bluebase/components';
import { TabNavigator } from '../TabNavigator';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { useLocation } from '../../../lib';
import { waitForElement } from 'enzyme-async-helpers';

jest.mock('../../../lib');

// const createRouterContext = require('react-router-test-context').default;

const mainNavigator = {
	initialRouteName: 'Root',
	routes: [
		{
			name: 'Home',
			path: '/',
			exact: true,
			screen: 'HomeScreen',
			navigationOptions: {},
		},
		{
			name: 'TabsDemo',
			path: 'tabs',
			navigator: {
				type: 'tab',
				routes: [
					{
						name: 'Tab1',
						path: '/tabs/tab1',
						exact: true,
						screen: Tab1Screen,
						navigationOptions: {
							title: 'Overview',
						},
					},
					{
						name: 'Tab2',
						path: '/tabs/tab2',
						exact: true,
						screen: Tab2Screen,
					},
				],
			},
			navigationOptions: {
				title: 'Settings Tabs',
			},
		},
	],
	type: 'stack',
};

describe('TabNavigator', () => {
	it('should render a Tabs', async () => {
		(useLocation as jest.Mock).mockImplementation(() => ({
			hash: '',
			key: 'u2vxal',
			pathname: '/tabs',
			search: '',
			state: {},
		}));

		const navigation: any = {
			navigate: jest.fn(),
			push: jest.fn(),
			state: {
				params: {},
			},
		};

		const wrapper = mount(
			<MemoryRouter>
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<NavigationContext.Provider value={navigation}>
						<MainNavigatorContext.Provider value={mainNavigator as any}>
							<TabNavigator
								routes={mainNavigator.routes[1].navigator!.routes as any}
								screenProps={{} as any}
							>
								<Text testID="NavigatorChild">Hello there</Text>
							</TabNavigator>
						</MainNavigatorContext.Provider>
					</NavigationContext.Provider>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, Tab);
		// expect(wrapper.find('TabNavigator')).toMatchSnapshot();

		expect(wrapper.find(Tab)).toHaveLength(2);
		expect(
			wrapper
				.find('Tabs')
				.first()
				.prop('value')
		).toBe(0);

		const onChange: any = wrapper
			.find('Tabs')
			.first()
			.prop('onChange');

		onChange({}, 1);

		expect(navigation.push).toHaveBeenCalledTimes(1);
		expect(navigation.push).toHaveBeenCalledWith('Tab2', {});
	});

	it('should render a Tabs with second tab as selected', async () => {
		const wrapper = mount(
			<MemoryRouter>
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<Route
						location={{
							hash: '',
							key: 'u2vxal',
							pathname: '/tabs/tab2',
							search: '',
							state: {},
						}}
					>
						<MainNavigatorContext.Provider value={mainNavigator as any}>
							<TabNavigator
								routes={mainNavigator.routes[1].navigator!.routes as any}
								screenProps={{} as any}
							>
								<Text testID="NavigatorChild">Hello there</Text>
							</TabNavigator>
						</MainNavigatorContext.Provider>
					</Route>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, Tab);
		// expect(wrapper.find('TabNavigator')).toMatchSnapshot();

		expect(wrapper.find(Tab)).toHaveLength(2);
		expect(
			wrapper
				.find('Tabs')
				.first()
				.prop('value')
		).toBe(1);
	});
});
