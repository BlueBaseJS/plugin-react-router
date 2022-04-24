import { BottomNavigationAction } from '@bluebase/components';
import { BlueBaseApp, NavigationContext } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { Text } from 'react-native';
import { MemoryRouter, Route } from 'react-router';

import { Tab1Screen, Tab2Screen } from '../../../../bluebase/expo/apps/plugin-settings-app/Screens';
import Plugin from '../../..';
import { MainNavigatorContext } from '../../../components';
import { useLocation } from '../../../lib';
import { BottomNavigationNavigator } from '../BottomNavigationNavigator';

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
				type: 'bottom-tab',
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

describe('BottomNavigation', () => {
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
							<BottomNavigationNavigator
								routes={mainNavigator.routes[1].navigator!.routes as any}
								screenProps={{} as any}
							>
								<Text testID="NavigatorChild">Hello there</Text>
							</BottomNavigationNavigator>
						</MainNavigatorContext.Provider>
					</NavigationContext.Provider>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, BottomNavigationAction);
		// expect(wrapper.find('BottomNavigation')).toMatchSnapshot();

		expect(wrapper.find(BottomNavigationAction)).toHaveLength(2);
		expect(
			wrapper
				.find('BottomNavigation')
				.first()
				.prop('value')
		).toBe(0);

		const onChange: any = wrapper
			.find('BottomNavigation')
			.first()
			.prop('onChange');

		onChange({}, 1);

		expect(navigation.push).toHaveBeenCalledTimes(1);
		expect(navigation.push).toHaveBeenCalledWith('Tab2', {});
	});

	it('should render a BottomNavigation with second tab as selected', async () => {
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
							<BottomNavigationNavigator
								routes={mainNavigator.routes[1].navigator!.routes as any}
								screenProps={{} as any}
							>
								<Text testID="NavigatorChild">Hello there</Text>
							</BottomNavigationNavigator>
						</MainNavigatorContext.Provider>
					</Route>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, BottomNavigationAction);
		// expect(wrapper.find('BottomNavigation')).toMatchSnapshot();

		expect(wrapper.find(BottomNavigationAction)).toHaveLength(2);
		expect(
			wrapper
				.find('BottomNavigation')
				.first()
				.prop('value')
		).toBe(1);
	});
});
