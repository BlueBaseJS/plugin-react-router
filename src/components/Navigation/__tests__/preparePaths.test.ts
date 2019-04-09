import { NavigatorProps } from '@bluebase/components';
import { preparePaths } from '../preparePaths';


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

// const output = {
// 	initialRouteName: 'Root',
// 	routes: [
// 		{
// 			name: 'Root',
// 			navigator: {
// 				initialRouteName: 'Home',
// 				path: '/',
// 				routes: [
// 					{ name: 'Home', path: '/', exact: true, screen: 'HomeScreen', navigationOptions: {} },
// 					{ name: 'Settings', path: '/p/settings', exact: true, screen: 'SettingsScreen', navigationOptions: {} },
// 					{ name: 'SettingsDetail', path: '/p/settings/:id', screen: fn, navigationOptions: {}, navigator: undefined }
// 				],
// 				type: 'stack',
// 			},

// 			navigationOptions: { header: null },
// 		}
// 	],
// 	type: 'stack',
// };

test('preparePaths', async () => {

	const navigator = preparePaths(input);

	expect((navigator as any).routes[0].path).toBe('/');
	expect((navigator as any).routes[0].navigator.routes[0].path).toBe('/');
	expect((navigator as any).routes[0].navigator.routes[1].path).toBe('/p/settings');
	expect((navigator as any).routes[0].navigator.routes[2].path).toBe('/p/settings/:id');

	// expect(navigator).toMatchObject(output);
});
