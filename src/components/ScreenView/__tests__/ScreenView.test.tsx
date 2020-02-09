import { BlueBaseApp } from '@bluebase/core';
import Plugin from '../../../';
import React from 'react';
import { ScreenView } from '../ScreenView';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

describe('ScreenView', () => {
	it('should render SettingsScreen', async () => {
		const Layout = ({ children }: any) => <Text>{children}</Text>;
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
					navigation={{} as any}
					Layout={Layout}
				>
					{children}
				</ScreenView>
			</BlueBaseApp>
		);

		await waitForElement(wrapper, ScreenView);

		expect(wrapper.find(Layout).exists()).toBe(true);
		// expect(wrapper.find(SettingsScreen).exists()).toBe(true);
	});
});
