import { NavigatorProps, RouteConfig } from '@bluebase/components';
import { findRouteByKey } from '../findRouteByKey';

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

test('findRouteByKey', () => {
	expect((findRouteByKey('', 'path', inputRoutes) as RouteConfig).name).toBe('Root');
	expect((findRouteByKey('p/settings', 'path', inputRoutes) as RouteConfig).name).toBe('Settings');
	expect((findRouteByKey('SettingsDetail', 'name', inputRoutes) as RouteConfig).path).toBe(
		'p/settings/:id'
	);
});
