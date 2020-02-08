import { BlueBaseApp, getComponent } from '@bluebase/core';
import Plugin from '../../../';
import React from 'react';
import { ScreenViewProps } from '../ScreenView';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const HomeScreen = getComponent('HomeScreen');
const ScreenView = getComponent<ScreenViewProps>('ScreenView');

describe('ScreenView', () => {

	it('should render ScreenView with given children', async () => {

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]} components={{ HeaderBackButton: () => { return null; } }}>
				<ScreenView navigation={null as any} navigator={null as any}>
					<Text testID="ScreenViewChild">Hello there</Text>
				</ScreenView>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, ScreenView);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('ScreenView [testID="ScreenViewChild"]').last().text()).toBe('Hello there');
	});

	it('should render ScreenView with given screen component', async () => {

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]} components={{ HeaderBackButton: () => { return null; } }}>
				<ScreenView navigation={null as any} navigator={null as any} screen={HomeScreen}>
					<Text testID="ScreenViewChild">Hello there</Text>
				</ScreenView>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, ScreenView);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('ScreenView HomeScreen').last()).toHaveLength(1);
		expect(wrapper.find('ScreenView [testID="ScreenViewChild"]')).toHaveLength(0);
	});

});
