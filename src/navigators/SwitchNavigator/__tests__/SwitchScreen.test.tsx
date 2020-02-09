import { Text, View } from 'react-native';

import { BlueBaseApp } from '@bluebase/core';
import Plugin from '../../..';
import React from 'react';
import { SwitchScreen } from '../SwitchScreen';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('SwitchScreen', () => {
	it('should render SwitchScreen with given children', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<SwitchScreen {...({ navigation: {}, navigator: {}, route: {} } as any)}>
					<Text testID="SwitchScreenChild">Hello there</Text>
				</SwitchScreen>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, SwitchScreen);

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('SwitchScreen [testID="SwitchScreenChild"]')
				.last()
				.text()
		).toBe('Hello there');
	});

	it('should render SwitchScreen with given screen component', async () => {
		const Layout = ({ children }: any) => <View testID="layout">{children}</View>;
		Layout.displayName = 'Layout';

		const wrapper = mount(
			<BlueBaseApp
				plugins={[Plugin]}
				components={{
					HeaderBackButton: () => {
						return null;
					},
				}}
			>
				<SwitchScreen
					navigation={null as any}
					navigator={null as any}
					route={null as any}
					Screen={Layout}
				>
					<Text testID="SwitchScreenChild">Hello there</Text>
				</SwitchScreen>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, SwitchScreen);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('SwitchScreen Layout').last()).toHaveLength(1);
		expect(wrapper.find('SwitchScreen [testID="SwitchScreenChild"]').exists()).toBe(true);
	});
});
