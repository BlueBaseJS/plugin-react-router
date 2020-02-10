/* eslint-disable react/jsx-no-bind */
// https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-443815828
import 'react-native-gesture-handler';

import { Button, Text, View } from 'react-native';
import { ComponentState, Noop } from '@bluebase/components';
// tslint:disable: object-literal-sort-keys
import {
	HomeScreen,
	SettingsDetailScreen,
	SettingsScreen,
	Tab1Screen,
	Tab2Screen,
} from './Screens';

import { DrawerTab1Screen } from './Screens/DrawerTab1';
import { DrawerTab2Screen } from './Screens/DrawerTab2';
import { ParamsScreen } from './Screens/Params';
import React from 'react';
import { createPlugin } from '@bluebase/core';

const plugin = createPlugin({
	key: 'settings',
	name: 'Settings',

	components: {
		HomeScreen,
	},

	routes: [
		{
			name: 'Settings',
			path: '/',
			exact: true,
			screen: SettingsScreen,
		},
		{
			name: 'WrappedSettings',
			path: '/wrapped',
			// exact: true,

			// eslint-disable-next-line react/display-name
			screen: ({ children }: any) => (
				<View style={{ backgroundColor: 'rgba(0,255,0,.2)', paddingVertical: 50, flex: 1 }}>
					<Text>Wrapper</Text>
					{children}
				</View>
			),

			navigationOptions: {
				header: null,
			},

			navigator: {
				type: 'stack',

				routes: [
					{
						name: 'WrappedScreen',
						path: '/w',
						exact: true,

						// eslint-disable-next-line react/display-name
						screen: () => <ComponentState title="Wrapped" description="This screen is wrapped" />,

						navigationOptions: {
							title: 'Wrapped Screen',
						},
					},
				],
			},
		},

		{
			name: 'NativeStack',
			path: '/native-stack',

			options: {
				headerShown: false,
				contentStyle: {
					backgroundColor: 'black',
				},
			},

			navigator: {
				type: 'native-stack',
				// mode: 'modal',

				routes: [
					{
						name: 'Native 1',
						path: 'native1',
						exact: true,

						// eslint-disable-next-line react/display-name
						screen: (props: any) => (
							<ComponentState
								title="Title 1"
								description="This screen is in a native stack"
								actionOnPress={() => props.navigation.navigate('Native2')}
								actionTitle="Show Modal"
							/>
						),

						navigationOptions: {
							// stackPresentation: 'modal',
							title: 'Native Stack 1 Screen',
						},
					},
					{
						name: 'Native2',
						path: 'native2',
						exact: true,

						// eslint-disable-next-line react/display-name
						screen: () => (
							<ComponentState title="Title 2" description="This screen is in a modal" />
						),

						navigationOptions: {
							stackPresentation: 'modal',
							title: 'Native Stack 2 Screen',
						} as any,
					},
				],
			},
		},

		{
			name: 'Modal',
			path: '/modal',

			options: {
				headerShown: false,
				contentStyle: {
					backgroundColor: 'black',
				},
			},

			navigator: {
				type: 'stack',
				mode: 'modal',

				routes: [
					{
						name: 'Modal1',
						path: 'modal1',
						// exact: true,

						navigationOptions: {
							// stackPresentation: 'modal',
							header: null,
						},

						navigator: {
							type: 'stack',

							routes: [
								{
									name: 'Home',
									path: '/',
									exact: true,

									// eslint-disable-next-line react/display-name
									screen: (props: any) => (
										<>
											<ComponentState
												title="Title 1"
												description="This screen should be outside modal"
												actionTitle="Modal 2"
												actionOnPress={() => props.navigation.navigate('Modal2')}
											/>
											<Button
												title="Nested route"
												onPress={() => props.navigation.navigate('NestedModalStack')}
											/>
										</>
									),

									navigationOptions: {
										// stackPresentation: 'modal',
										title: 'Modal 1 Screen',
									},
								},
								{
									name: 'NestedModalStack',
									path: '/nested-modal-stack',
									exact: true,

									// eslint-disable-next-line react/display-name
									screen: (props: any) => (
										<ComponentState
											title="Nested Modal Stack"
											description="This screen should be outside modal"
											actionTitle="Modal 2"
											actionOnPress={() => props.navigation.navigate('Modal2')}
										/>
									),

									navigationOptions: {
										// stackPresentation: 'modal',
										title: 'Nested Modal Stack',
									},
								},
							],
						},
					},
					{
						name: 'Modal2',
						path: 'modal2',
						exact: true,

						// eslint-disable-next-line react/display-name
						screen: () => (
							<ComponentState title="Title 2" description="This screen is in a modal" />
						),

						navigationOptions: {
							stackPresentation: 'modal',
							title: 'Modal 2 Screen',
						} as any,
					},
				],
			},
		},

		{
			name: 'Params',
			path: '/params',
			exact: true,
			screen: ParamsScreen,
			navigationOptions: () => {
				return {
					title: 'Params',
				};
			},
		},

		{
			name: 'TabsDemo',
			path: 'tabs-demo',
			navigator: {
				type: 'tab',
				routes: [
					{
						name: 'Tab1',
						path: 'tab1',
						exact: true,
						screen: Tab1Screen,
						navigationOptions: {
							title: 'Overview',
						},
					},
					{
						name: 'Tab2',
						path: 'tab2',
						exact: true,
						screen: Tab2Screen,
					},
				],
			},
			navigationOptions: {
				title: 'Settings Tabs',
			},
		},

		{
			name: 'SettingsBottomTabs',
			path: 'btabs',
			navigator: {
				type: 'bottom-tab',
				routes: [
					{
						name: 'BTab1',
						path: 'bt1',
						exact: true,
						screen: Tab1Screen,
						navigationOptions: {
							title: 'Home',
						},
					},
					{
						name: 'BTab2',
						path: 'bt2',
						exact: true,
						screen: Tab2Screen,
					},
				],
			},
			navigationOptions: {
				title: 'Settings Tabs',
			},
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
		{
			name: 'SettingsDetail',
			path: '/:id',
			screen: SettingsDetailScreen,
			navigationOptions: {
				title: 'Settings Detail',
			},
		},
	],
});

export default {
	...plugin,
};
