import { RouteComponentProps } from '../../lib';
import { historyToActionObject } from '../historyToActionObject';

const mainNavigator = {
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
		const result = historyToActionObject(input, mainNavigator);

		expect(result.state.key).toBe('u2vxal');
		expect(result.state.search).toBe('?a=b');
		expect(result.state.url).toBe('/p/settings/foo');
		expect(result.state.routeName).toBe('SettingsDetail');
		expect(result.state.params).toMatchObject({ name: 'General', title: 'Bar', id: 'foo' });
		expect(result.source).toBeTruthy();
	});

	it('should throw an error if match is undefined', () => {
		let message;

		try {
			historyToActionObject({ ...input, match: undefined } as any, mainNavigator);
		} catch (error) {
			message = error.message;
		}

		expect(message).toBe('An error occurent in React Router Plugn. We did not find match object');
	});

	it('should set the routeName prop to empty string, if a route object is not found', () => {
		const result = historyToActionObject(
			{ ...input, match: { ...input.match, path: '//!!' } },
			mainNavigator
		);

		expect(result.state.key).toBe('u2vxal');
		expect(result.state.search).toBe('?a=b');
		expect(result.state.url).toBe('/p/settings/foo');
		expect(result.state.routeName).toBe('');
	});

	it('should call historys push method from navigation push', () => {
		input.history.push = jest.fn();

		const result = historyToActionObject(input, mainNavigator);

		result.push('Settings', { foo: 'bar' });

		expect(input.history.push).toBeCalledTimes(1);
		expect(input.history.push).toBeCalledWith('/p/settings', { foo: 'bar' });
	});

	it('should call historys push method from navigation navigate', () => {
		input.history.push = jest.fn();

		const result = historyToActionObject(input, mainNavigator);

		result.navigate('Settings', { foo: 'bar' });

		expect(input.history.push).toBeCalledTimes(1);
		expect(input.history.push).toBeCalledWith('/p/settings', { foo: 'bar' });
	});

	it('should call historys replace method from navigation replace', () => {
		input.history.replace = jest.fn();

		const result = historyToActionObject(input, mainNavigator);

		result.replace('Settings', { foo: 'bar' });

		expect(input.history.replace).toBeCalledTimes(1);
		expect(input.history.replace).toBeCalledWith('/p/settings', { foo: 'bar' });
	});

	it('should call historys goBack method from navigation goBack', () => {
		input.history.goBack = jest.fn();

		const result = historyToActionObject(input, mainNavigator);

		result.goBack();

		expect(input.history.goBack).toBeCalledTimes(1);
		expect(input.history.goBack).toBeCalledWith();
	});

	it('should call historys go method from navigation pop with param as 0', () => {
		input.history.go = jest.fn();

		const result = historyToActionObject(input, mainNavigator);

		result.pop();

		expect(input.history.go).toBeCalledTimes(1);
		expect(input.history.go).toBeCalledWith(0);
	});

	it('should call historys go method from navigation pop with param as -5', () => {
		input.history.go = jest.fn();

		const result = historyToActionObject(input, mainNavigator);

		result.pop(5);

		expect(input.history.go).toBeCalledTimes(1);
		expect(input.history.go).toBeCalledWith(-5);
	});

	it('should call historys replace method from navigation setParams', () => {
		input.history.replace = jest.fn();

		const result = historyToActionObject(input, mainNavigator);

		result.setParams({ bar: 'bax' });

		expect(input.history.replace).toBeCalledTimes(1);
		expect(input.history.replace).toBeCalledWith({
			pathname: '/p/settings/foo',
			search: '?a=b',
			state: { bar: 'bax', id: 'foo', name: 'General', title: 'Bar' },
		});
	});

	it('should get param value from state through getParam method', () => {
		const result = historyToActionObject(input, mainNavigator);

		result.getParam('id', 'hello');

		expect(result.getParam('id', 'hello')).toBe('foo');
	});

	it('should get default param value from  getParam method if certain key does not exist in state', () => {
		const result = historyToActionObject(input, mainNavigator);

		result.getParam('getting', 'hello');

		expect(result.getParam('getting', 'hello')).toBe('hello');
	});
});
