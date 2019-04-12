import { BlueBase } from '@bluebase/core';
import { RouteComponentProps } from '../../lib';
import { historyToActionObject } from '../historyToActionObject';

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

const location = {
	hash: '',
	key: 'u2vxal',
	pathname: '/p/settings/foo',
	search: '?a=b',
	state: { name: 'General', title: 'Bar' },
};

const input: RouteComponentProps = {
	history: {} as any,
	location,
	match: {
		isExact: true,
		params: { id: 'foo' },
		path: '/p/settings/:id',
		url: '/p/settings/foo',
	},
};

describe('historyToActionObject', () => {
	beforeAll(() => {
		input.history = {
			action: 'PUSH',
			length: 50,
			location,

			block: jest.fn(),
			createHref: jest.fn(),
			go: jest.fn(),
			goBack: jest.fn(),
			goForward: jest.fn(),
			listen: jest.fn(),
			push: jest.fn(),
			replace: jest.fn(),
		};
	});

	it('should convert a history object to action object', () => {
		const BB = new BlueBase();
		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', true);
		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

		const result = historyToActionObject(input, BB);

		expect(result.state.key).toBe('u2vxal');
		expect(result.state.search).toBe('?a=b');
		expect(result.state.url).toBe('/p/settings/foo');
		expect(result.state.routeName).toBe('SettingsDetail');
		expect(result.state.params).toMatchObject({ name: 'General', title: 'Bar', id: 'foo' });
		expect(result.source).toBeTruthy();
	});

	it('should throw an error if match is undefined', () => {
		const BB = new BlueBase();
		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', true);
		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

		let message;

		try {
			historyToActionObject({ ...input, match: undefined } as any, BB);
		} catch (error) {
			message = error.message;
		}

		expect(message).toBe('An error occurent in React Router Plugn. We did not find match object');
	});

	it('should set the routeName prop to empty string, if a route object is not found', () => {
		const BB = new BlueBase();
		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', true);
		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

		const result = historyToActionObject({ ...input, match: { ...input.match, path: '//!!' } }, BB);

		expect(result.state.key).toBe('u2vxal');
		expect(result.state.search).toBe('?a=b');
		expect(result.state.url).toBe('/p/settings/foo');
		expect(result.state.routeName).toBe('');
	});

	it('should not set source prop if "enableSourceInNavigationActions" is false', () => {
		const BB = new BlueBase();
		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

		const result = historyToActionObject({ ...input, match: { ...input.match, path: '//!!' } }, BB);

		expect(result.source).toBeUndefined();
	});

	it('should call historys push method from navigation push', () => {
		const BB = new BlueBase();
		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

		input.history.push = jest.fn();

		const result = historyToActionObject(input, BB);

		result.push('Settings', { foo: 'bar' });

		expect(input.history.push).toBeCalledTimes(1);
		expect(input.history.push).toBeCalledWith('/p/settings', { foo: 'bar' });
	});

	it('should call historys push method from navigation navigate', () => {
		const BB = new BlueBase();
		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

		input.history.push = jest.fn();

		const result = historyToActionObject(input, BB);

		result.navigate('Settings', { foo: 'bar' });

		expect(input.history.push).toBeCalledTimes(1);
		expect(input.history.push).toBeCalledWith('/p/settings', { foo: 'bar' });
	});

	it('should call historys replace method from navigation replace', () => {
		const BB = new BlueBase();
		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

		input.history.replace = jest.fn();

		const result = historyToActionObject(input, BB);

		result.replace('Settings', { foo: 'bar' });

		expect(input.history.replace).toBeCalledTimes(1);
		expect(input.history.replace).toBeCalledWith('/p/settings', { foo: 'bar' });
	});

	it('should call historys goBack method from navigation goBack', () => {
		const BB = new BlueBase();
		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

		input.history.goBack = jest.fn();

		const result = historyToActionObject(input, BB);

		result.goBack();

		expect(input.history.goBack).toBeCalledTimes(1);
		expect(input.history.goBack).toBeCalledWith();
	});

	it('should call historys go method from navigation pop with param as 0', () => {
		const BB = new BlueBase();
		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

		input.history.go = jest.fn();

		const result = historyToActionObject(input, BB);

		result.pop();

		expect(input.history.go).toBeCalledTimes(1);
		expect(input.history.go).toBeCalledWith(0);
	});

	it('should call historys go method from navigation pop with param as -5', () => {
		const BB = new BlueBase();
		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

		input.history.go = jest.fn();

		const result = historyToActionObject(input, BB);

		result.pop(5);

		expect(input.history.go).toBeCalledTimes(1);
		expect(input.history.go).toBeCalledWith(-5);
	});

	it('should call historys replace method from navigation setParams', () => {
		const BB = new BlueBase();
		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

		input.history.replace = jest.fn();

		const result = historyToActionObject(input, BB);

		result.setParams({ bar: 'bax' });

		expect(input.history.replace).toBeCalledTimes(1);
		expect(input.history.replace).toBeCalledWith('/p/settings/:id', { id: 'foo', bar: 'bax' });
	});

	it('should get param value from state through getParam method', () => {
		const BB = new BlueBase();
		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

		const result = historyToActionObject(input, BB);

		result.getParam('id', 'hello');

		expect(result.getParam('id', 'hello')).toBe('foo');
	});

	it('should get default param value from  getParam method if certain key does not exist in state', () => {
		const BB = new BlueBase();
		BB.Configs.setValue('plugin.react-router.enableSourceInNavigationActions', false);
		BB.Configs.setValue('plugin.react-router.navigationConfigs', inputRoutes);

		const result = historyToActionObject(input, BB);

		result.getParam('getting', 'hello');

		expect(result.getParam('id', 'hello')).toBe('hello');
	});
});
