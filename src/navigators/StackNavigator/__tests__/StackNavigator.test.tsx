import { BlueBaseApp } from '@bluebase/core';
import Plugin from '../../..';
import React from 'react';
import { StackNavigator } from '../StackNavigator';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('StackNavigator', () => {
	it('should render StackNavigator with given children', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<StackNavigator {...({ mode: 'card' } as any)}>
					<Text testID="StackNavigatorChild">Hello there</Text>
				</StackNavigator>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, StackNavigator);

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('StackNavigator [testID="StackNavigatorChild"]')
				.last()
				.text()
		).toBe('Hello there');
	});

	it('should render StackNavigator with given screen component', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<StackNavigator {...({ mode: 'modal' } as any)}>
					<Text testID="StackNavigatorChild">Hello there</Text>
				</StackNavigator>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, StackNavigator);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('ModalNavigator').exists()).toBe(true);
	});
});
