import { BlueBaseApp, getComponent } from '@bluebase/core';

import Plugin from '../../..';
import React from 'react';
import { StackScreen } from '../StackScreen';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const HomeScreen = getComponent('HomeScreen');

describe('StackScreen', () => {
	it('should render StackScreen with given children', async () => {
		const wrapper = mount(
			<BlueBaseApp
				plugins={[Plugin]}
				components={{
					HeaderBackButton: () => {
						return null;
					},
				}}
			>
				<StackScreen navigation={null as any} navigator={null as any} route={null as any}>
					<Text testID="StackScreenChild">Hello there</Text>
				</StackScreen>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, StackScreen);

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('StackScreen [testID="StackScreenChild"]')
				.last()
				.text()
		).toBe('Hello there');
	});

	it('should render StackScreen with given screen component', async () => {
		const wrapper = mount(
			<BlueBaseApp
				plugins={[Plugin]}
				components={{
					HeaderBackButton: () => {
						return null;
					},
				}}
			>
				<StackScreen
					navigation={null as any}
					navigator={null as any}
					route={null as any}
					Screen={HomeScreen}
				>
					<Text testID="StackScreenChild">Hello there</Text>
				</StackScreen>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, StackScreen);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('StackScreen HomeScreen').last()).toHaveLength(1);
		expect(wrapper.find('StackScreen [testID="StackScreenChild"]')).toHaveLength(0);
	});
});
