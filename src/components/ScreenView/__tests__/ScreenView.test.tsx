const mockedNavigation: any = {
	addListener: jest.fn(),
	closeDrawer: jest.fn(),
	dangerouslyGetParent: jest.fn(),
	dismiss: jest.fn(),
	dispatch: jest.fn(),
	getParam: jest.fn(),
	goBack: jest.fn(),
	isFocused: jest.fn(),
	navigate: jest.fn(),
	openDrawer: jest.fn(),
	pop: jest.fn(),
	popToTop: jest.fn(),
	push: jest.fn(),
	replace: jest.fn(),
	setParams: jest.fn(),
	toggleDrawer: jest.fn(),
};

const mockedRoute = {
	index: 0,
	isTransitioning: false,
	key: 'kjdkj',
	name: 'Home',
	params: { foo: 'bar' },
	path: '/',
	routes: [
		{
			index: 1,
			isTransitioning: false,
			key: 'jsdfl',
			path: '/settings',
			routeName: 'Settings',
			routes: [],
		},
	],
};

jest.mock('@react-navigation/native', () => {
	const actual = jest.requireActual('@react-navigation/native');
	return {
		...actual,

		useNavigation: () => mockedNavigation,
		useRoute: () => mockedRoute,
	};
});

import { BlueBaseApp } from '@bluebase/core';
import Plugin from '../../../';
import React from 'react';
import { ScreenView } from '../ScreenView';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ScreenView', () => {
	it('should render SettingsScreen', async () => {
		const SettingsScreen = () => <Text>Settings</Text>;
		const children = jest.fn().mockReturnValue(null);

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<ScreenView
					route={{
						name: 'Settings',
						path: '/',
						screen: SettingsScreen,

						options: {
							title: 'Settings',
						},
					}}
				>
					{children}
				</ScreenView>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ScreenView);
		expect(wrapper.find(SettingsScreen).exists()).toBe(true);
	});
});
