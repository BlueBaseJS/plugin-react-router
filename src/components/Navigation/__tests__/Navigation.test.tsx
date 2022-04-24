import { Noop } from '@bluebase/components';
import { BlueBaseApp } from '@bluebase/core';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';

import { MemoryRouter } from '../../../lib';
import { createNavigation } from '../createNavigation';

// jest.mock('../../../lib');

// const createRouterContext = require('react-router-test-context').default;

const mainNavigator = {
	initialRouteName: 'Root',
	routes: [
		{
			name: 'Root',
			navigationOptions: { header: null },
			navigator: {
				initialRouteName: 'Settings',
				type: 'stack',
				mode: 'modal',

				routes: [
					{
						name: 'Main',
						path: '/main',
						navigationOptions: {},

						navigator: {
							type: 'stack',

							routes: [
								{
									name: 'Home',
									path: '/',
									exact: true,
									screen: 'HomeScreen',
									navigationOptions: {},
								},
								{
									name: 'About',
									path: '/about',
									exact: true,
									screen: 'EmptyState',
									navigationOptions: {},
								},
							],
						},
					},
				],
			},
			path: '/', //
		},
	],
	type: 'stack',
};

describe('StackNavigator', () => {
	it('should render a ModalNavigator', async () => {
		const Navigator = Noop;
		Navigator.displayName = 'Navigator';

		const Navigation = createNavigation(MemoryRouter);

		const wrapper = mount(
			<BlueBaseApp components={{ Navigator }}>
				<Navigation navigator={mainNavigator as any} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Navigation);

		expect(wrapper.find(Navigator).exists()).toBe(true);
	});
});
