import { NavigatorProps } from '@bluebase/components';

import { insertChildNavigator } from '../insertChildNavigator';

const inputRoutes: NavigatorProps = {
	initialRouteName: 'Root',
	routes: [
		{
			name: 'Root',
			navigationOptions: { header: null },
			navigator: {
				initialRouteName: 'Home',
				routes: [
					{ name: 'Home', path: '', exact: true, screen: 'HomeScreen', navigationOptions: {} },
					{
						exact: true,
						name: 'Settings',
						navigationOptions: {},
						path: 'p/settings',
						screen: 'SettingsScreen',
					},
					{
						name: 'SettingsDetail',
						navigationOptions: {},
						path: 'p/settings/:id',
						screen: 'SettingsDetail',
					},
				],
				type: 'stack',
			},
			path: '', //
		},
	],
	type: 'stack',
};

test('insertChildNavigator', () => {
	expect(insertChildNavigator(inputRoutes, inputRoutes, 'SettingsDetail')).toMatchObject({
		initialRouteName: 'Root',
		routes: [
			{
				name: 'Root',
				navigationOptions: { header: null },
				navigator: {
					initialRouteName: 'Home',
					routes: [
						{ name: 'Home', path: '', exact: true, screen: 'HomeScreen', navigationOptions: {} },
						{
							exact: true,
							name: 'Settings',
							navigationOptions: {},
							path: 'p/settings',
							screen: 'SettingsScreen',
						},
						{
							name: 'SettingsDetail',
							navigationOptions: {},
							path: 'p/settings/:id',
							screen: 'SettingsDetail',

							navigator: {
								initialRouteName: 'Root',
								routes: [
									{
										name: 'Root',
										navigationOptions: { header: null },
										navigator: {
											initialRouteName: 'Home',
											routes: [
												{
													name: 'Home',
													path: '',
													exact: true,
													screen: 'HomeScreen',
													navigationOptions: {},
												},
												{
													exact: true,
													name: 'Settings',
													navigationOptions: {},
													path: 'p/settings',
													screen: 'SettingsScreen',
												},
												{
													name: 'SettingsDetail',
													navigationOptions: {},
													path: 'p/settings/:id',
													screen: 'SettingsDetail',
												},
											],
											type: 'stack',
										},
										path: '', //
									},
								],
								type: 'stack',
							},
						},
					],
					type: 'stack',
				},
				path: '', //
			},
		],
		type: 'stack',
	});
});
