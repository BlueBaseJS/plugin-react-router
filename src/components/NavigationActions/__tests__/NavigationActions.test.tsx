import { MainNavigatorContext } from '../../Navigation';
import { MemoryRouter } from 'react-router';
import { NavigationActions } from '../NavigationActions';
import React from 'react';
import { mount } from 'enzyme';

const createRouterContext = require('react-router-test-context').default;

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

describe('NavigationActions', () => {
	it('should check props', async () => {
		const context = createRouterContext({
			history: {} as any,
			location: {
				hash: '',
				key: 'u2vxal',
				pathname: '/p/settings/foo',
				search: '?a=b',
				state: { name: 'General', title: 'Bar' },
			},
			match: {
				isExact: true,
				params: { id: 'foo' },
				path: '/p/settings/:id',
				url: '/p/settings/foo',
			},
		});
		const children = jest.fn().mockReturnValue(null);

		mount(
			<MemoryRouter>
				<MainNavigatorContext.Provider value={mainNavigator}>
					<NavigationActions>{children}</NavigationActions>
				</MainNavigatorContext.Provider>
			</MemoryRouter>,
			{ context }
		);

		expect(children).toHaveBeenCalledTimes(1);

		const result = children.mock.calls[0][0];

		expect(result.state.routeName).toBe('Root');
	});
});
