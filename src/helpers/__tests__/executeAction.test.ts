import { executeAction } from '../executeAction';

const inputRoutes = {
	initialRouteName: 'Root',
	routes: [
		{
			name: 'Root',
			navigationOptions: { header: null },
			navigator: {
				initialRouteName: 'Home',
				routes: [
					{ name: 'Home', path: '/', exact: true, screen: 'HomeScreen', navigationOptions: {} },
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
				type: 'stack',
			},
			path: '/', //
		},
	],
	type: 'stack',
};

describe('executeAction', () => {
	it('should called with correct path when routeName is a string', () => {
		const fn = jest.fn();
		const params = { foo: 'bar' };

		executeAction(inputRoutes, fn, 'Home', params);

		expect(fn).toBeCalledTimes(1);
		expect(fn).toBeCalledWith('/', params);
	});

	it('should called with correct path when routeName is an object with routeName string', () => {
		const fn = jest.fn();
		const params = { foo: 'bar' };

		executeAction(inputRoutes, fn, { routeName: 'Settings' }, params);

		expect(fn).toBeCalledTimes(1);
		expect(fn).toBeCalledWith('/p/settings', params);
	});

	it('should called with correct path when routeName is an object with path string', () => {
		const fn = jest.fn();
		const params = { foo: 'bar' };

		executeAction(inputRoutes, fn, { path: 'p/settings/foo?a=b' }, params);

		expect(fn).toBeCalledTimes(1);
		expect(fn).toBeCalledWith('/p/settings/foo?a=b', params);
	});

	it('should throw an error if route is not resolved', () => {
		const fn = jest.fn();
		const params = { foo: 'bar' };

		let message;

		try {
			executeAction(inputRoutes, fn, 'FooBar', params);
		} catch (error) {
			message = error.message;
		}

		expect(message).toBe('Invalid props provided to navigation action');
	});

	it('should throw an error if route is null', () => {
		const fn = jest.fn();
		const params = { foo: 'bar' };

		let message;

		try {
			executeAction(inputRoutes, fn, null as any, params);
		} catch (error) {
			message = error.message;
		}

		expect(message).toBe('Invalid props provided to navigation action');
	});
});
