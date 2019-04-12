// import { BlueBaseApp } from '@bluebase/core';
// import { Navigation } from '../Navigation';
// import { NavigatorProps } from '@bluebase/components';
// import Plugin from '../../../index';
// import React from 'react';
// import { mount } from 'enzyme';
// import { waitForElement } from 'enzyme-async-helpers';

// const input: NavigatorProps = {
// 	initialRouteName: 'Root',
// 	routes: [
// 		{
// 			name: 'Root',
// 			navigationOptions: { header: null },
// 			navigator: {
// 				initialRouteName: 'Home',
// 				routes: [
// 					{ name: 'Home', path: '', exact: true, screen: 'HomeScreen', navigationOptions: {} },
// 					{ name: 'Settings', path: 'p/settings', exact: true, screen: 'SettingsScreen', navigationOptions: {} },
// 					{ name: 'SettingsDetail', path: 'p/settings/:id', screen: 'SettingsDetail', navigationOptions: {} }
// 				],
// 				type: 'stack',
// 			},
// 			path: '', //
// 		}
// 	],
// 	type: 'stack',
// };

// describe('Navigation', () => {

// 	it('should render a router with child navigators', async () => {

// 		const wrapper = mount(
// 			<BlueBaseApp plugins={[Plugin]}>
// 				<Navigation navigator={input} />
// 			</BlueBaseApp>
// 		);

// 		// Wait for render
// 		await waitForElement(wrapper as any, Navigation);

// 		expect(wrapper).toMatchSnapshot();
// 	});

// });
