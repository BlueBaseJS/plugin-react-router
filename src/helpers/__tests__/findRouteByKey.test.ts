import { NavigatorProps, RouteConfig } from '@bluebase/components';
import { findRouteByKey } from '../findRouteByKey';

const input: NavigatorProps = {
	initialRouteName: 'Root',
	routes: [
		{
			name: 'Root',
			navigationOptions: { header: null },
			navigator: {
				initialRouteName: 'Home',
				routes: [
					{ name: 'Home', path: '', exact: true, screen: 'HomeScreen', navigationOptions: {} },
					{ name: 'Settings', path: 'p/settings', exact: true, screen: 'SettingsScreen', navigationOptions: {} },
					{ name: 'SettingsDetail', path: 'p/settings/:id', screen: 'SettingsDetail', navigationOptions: {} }
				],
				type: 'stack',
			},
			path: '', //
		}
	],
	type: 'stack',
};

test('findRouteByKey', () => {

	expect((findRouteByKey('', 'path', input) as RouteConfig).name).toBe('Root');
	expect((findRouteByKey('p/settings', 'path', input) as RouteConfig).name).toBe('Settings');
	expect((findRouteByKey('SettingsDetail', 'name', input) as RouteConfig).path).toBe('p/settings/:id');

});
