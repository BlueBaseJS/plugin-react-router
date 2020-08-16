import { Button, Text } from 'react-native';
import { DrawerActions, DrawerItem } from '@bluebase/components';

import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { DrawerNavigator } from '../DrawerNavigator';
import { DrawerTab1Screen } from '../../../../bluebase/expo/apps/plugin-settings-app/Screens/DrawerTab1';
import { DrawerTab2Screen } from '../../../../bluebase/expo/apps/plugin-settings-app/Screens/DrawerTab2';
import { MainNavigatorContext } from '../../../components';
import { MemoryRouter } from 'react-router';
import Plugin from '../../..';
import React from 'react';
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
			name: 'SettingsDrawer',
			path: 'drawer',

			navigationOptions: {
				title: 'Drawer Demo',
			},

			navigator: {
				type: 'drawer',

				drawerType: 'slide',

				contentOptions: {
					activeTintColor: '#e91e63',
					itemsContainerStyle: {
						marginVertical: 0,
					},
					iconContainerStyle: {
						opacity: 1,
					},
				},

				routes: [
					{
						name: 'DTab1',
						path: 'dt1',
						exact: true,
						screen: DrawerTab1Screen,
						navigationOptions: {
							title: 'DTab A',
							// drawerLockMode: 'locked-open',
						},
					},
					{
						name: 'DTab2',
						path: 'Dt2',
						exact: true,
						screen: DrawerTab2Screen,
						navigationOptions: {
							title: 'DTab B',
						},
					},
				],
			},
		},
	],
	type: 'stack',
};

describe('DrawerNavigator', () => {
	it('should render a Drawer', async () => {
		(useLocation as jest.Mock).mockImplementation(() => ({
			hash: '',
			key: 'u2vxal',
			pathname: '/drawer',
			search: '',
			state: {},
		}));

		const wrapper = mount(
			<MemoryRouter>
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<MainNavigatorContext.Provider value={mainNavigator as any}>
						<DrawerNavigator routes={mainNavigator.routes as any} screenProps={{} as any}>
							<DrawerActions>
								{({ toggleDrawer }: any) => (
									<Button title="Toggle" onPress={() => toggleDrawer()} />
								)}
							</DrawerActions>
						</DrawerNavigator>
					</MainNavigatorContext.Provider>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, DrawerNavigator);

		const onPress: any = wrapper
			.find('[title="Toggle"]')
			.first()
			.prop('onPress');

		onPress();

		await waitForElement(wrapper, DrawerItem);
		// expect(wrapper.find('DrawerNavigator')).toMatchSnapshot();

		expect(wrapper.find('DrawerItem')).toHaveLength(2);
		expect(wrapper.find('DrawerItem').exists()).toBe(true);
	});

	it('should render a Drawer with custom content component', async () => {
		const Custom = () => <Text>Custom</Text>;

		(useLocation as jest.Mock).mockImplementation(() => ({
			hash: '',
			key: 'u2vxal',
			pathname: '/drawer',
			search: '',
			state: {},
		}));

		const wrapper = mount(
			<MemoryRouter>
				<BlueBaseApp plugins={[BlueBasePluginMaterialUI, Plugin]}>
					<MainNavigatorContext.Provider value={mainNavigator as any}>
						<DrawerNavigator
							routes={mainNavigator.routes as any}
							screenProps={{} as any}
							contentComponent={Custom}
						>
							<DrawerActions>
								{({ toggleDrawer }: any) => (
									<Button title="Toggle" onPress={() => toggleDrawer()} />
								)}
							</DrawerActions>
						</DrawerNavigator>
					</MainNavigatorContext.Provider>
				</BlueBaseApp>
			</MemoryRouter>
		);

		await waitForElement(wrapper, DrawerNavigator);

		const onPress: any = wrapper
			.find('[title="Toggle"]')
			.first()
			.prop('onPress');

		onPress();

		// await waitForElement(wrapper, Custom);
		// // expect(wrapper.find('DrawerNavigator')).toMatchSnapshot();

		// expect(wrapper.find(Custom).exists()).toBe(true);
	});
});
