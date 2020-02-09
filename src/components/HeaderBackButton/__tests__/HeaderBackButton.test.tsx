import { BlueBaseApp, getComponent } from '@bluebase/core';
import { Button, I18nManager, Platform } from 'react-native';

import Plugin from '../../../';
import React from 'react';
import deepmerge from 'deepmerge';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const HeaderBackButton = getComponent('HeaderBackButton');

describe('HeaderBackButton', () => {
	test(`should only render back image`, async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<HeaderBackButton />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, HeaderBackButton);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('HeaderBackButton Image').exists()).toBe(true);
		expect(wrapper.find('HeaderBackButton [testID="header-back-title"]').length).toBe(0);
	});

	test(`should only render back image and standard title`, async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<HeaderBackButton backTitleVisible />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, HeaderBackButton);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('HeaderBackButton Image').exists()).toBe(true);
		expect(
			wrapper
				.find('HeaderBackButton [testID="header-back-title"]')
				.last()
				.text()
		).toBe('Back');
	});

	test(`should render custom back image`, async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<HeaderBackButton
					backTitleVisible
					backImage={React.createElement(Button, { title: 'Far', onPress: () => {} })}
				/>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, HeaderBackButton);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('HeaderBackButton Button').prop('title')).toBe('Far');
		expect(
			wrapper
				.find('HeaderBackButton [testID="header-back-title"]')
				.last()
				.text()
		).toBe('Back');
	});

	test(`should not render title when title prop is null`, async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<HeaderBackButton title={null} backTitleVisible />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, HeaderBackButton);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('HeaderBackButton Image').exists()).toBe(true);
		expect(wrapper.find('HeaderBackButton [testID="header-back-title"]').length).toBe(0);
	});

	test(`should only render back image and custom title`, async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<HeaderBackButton backTitleVisible title="Foo" />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, HeaderBackButton);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('HeaderBackButton Image').exists()).toBe(true);
		expect(
			wrapper
				.find('HeaderBackButton [testID="header-back-title"]')
				.last()
				.text()
		).toBe('Foo');
	});

	test(`should only render back image and truncated title`, async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<HeaderBackButton backTitleVisible title="A very very long title sentence" width={100} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, HeaderBackButton);

		wrapper
			.find('HeaderBackButton')
			.last()
			.setState({ initialTextWidth: 200 });

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('HeaderBackButton Image').exists()).toBe(true);
		expect(
			wrapper
				.find('HeaderBackButton [testID="header-back-title"]')
				.last()
				.text()
		).toBe('Back');
	});

	test(`should only render back image and custom truncated title`, async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<HeaderBackButton
					backTitleVisible
					title="A very very long title sentence"
					truncatedTitle="What? lol"
					width={100}
				/>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, HeaderBackButton);

		// Update layout
		(wrapper
			.find('HeaderBackButton')
			.last()
			.instance() as any)._onTextLayout({
			nativeEvent: {
				layout: {
					width: 200,
					x: 5,
				},
			},
		});
		wrapper.update();

		// expect(wrapper).toMatchSnapshot();

		expect(
			wrapper
				.find('HeaderBackButton')
				.last()
				.state('initialTextWidth')
		).toBe(205);
		expect(wrapper.find('HeaderBackButton Image').exists()).toBe(true);
		expect(
			wrapper
				.find('HeaderBackButton [testID="header-back-title"]')
				.last()
				.text()
		).toBe('What? lol');

		// Update layout again
		(wrapper
			.find('HeaderBackButton')
			.last()
			.instance() as any)._onTextLayout({
			nativeEvent: {
				layout: {
					width: 400,
					x: 500,
				},
			},
		});
		wrapper.update();

		// expect(wrapper).toMatchSnapshot();

		// But 'initialTextWidth' value should be unchanged
		expect(
			wrapper
				.find('HeaderBackButton')
				.last()
				.state('initialTextWidth')
		).toBe(205);
	});

	test(`should only render back image and title with custom tint color`, async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<HeaderBackButton backTitleVisible tintColor="red" />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, HeaderBackButton);

		wrapper
			.find('HeaderBackButton')
			.last()
			.setState({ initialTextWidth: 200 });

		const image = wrapper
			.find('HeaderBackButton Image')
			.last()
			.prop('style') as any;
		const text = wrapper
			.find('HeaderBackButton Text')
			.last()
			.prop('style') as any;

		const imageStyles = deepmerge.all(image) as any;
		// A value is undefined in styles array. Filter it.
		const textStyles = deepmerge.all(text.filter((a: any) => a !== undefined)) as any;

		// expect(wrapper).toMatchSnapshot();

		expect(imageStyles.tintColor).toBe('red');
		expect(textStyles.color).toBe('red');
	});

	test(`should only render back image on android platform`, async () => {
		jest.mock('react-native/Libraries/Utilities/Platform', () => {
			// const Platform = (require as any).requireActual('Platform');
			// Platform.Version = 22;
			// Platform.OS = 'android';

			return {
				OS: 'android',
				Version: 22,
			};
		});

		expect(Platform.OS).toBe('android');

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<HeaderBackButton />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, HeaderBackButton);

		// expect(wrapper).toMatchSnapshot();

		// DummyTouchableNativeFeedback break test 😅
		expect(wrapper.find('HeaderBackButton DummyTouchableNativeFeedback').length).toBe(1);

		// expect(wrapper.find('HeaderBackButton [testID="header-android-wrapper"] Image').length).toBe(1);
		// expect(wrapper.find('HeaderBackButton [testID="header-back-title"]').length).toBe(0);
	});

	test(`should only render back image on android platform`, async () => {
		jest.mock('react-native/Libraries/Utilities/Platform', () => {
			const Platform = (require as any).requireActual('Platform');
			Platform.OS = 'android';
			return Platform;
		});

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<HeaderBackButton />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, HeaderBackButton);

		// expect(wrapper).toMatchSnapshot();

		// DummyTouchableNativeFeedback break test 😅
		expect(wrapper.find('HeaderBackButton DummyTouchableNativeFeedback').length).toBe(1);

		// expect(wrapper.find('HeaderBackButton [testID="header-android-wrapper"] Image').length).toBe(1);
		// expect(wrapper.find('HeaderBackButton [testID="header-back-title"]').length).toBe(0);
	});

	test(`should only render reverse back image on rtl layout`, async () => {
		jest.mock('react-native/Libraries/ReactNative/I18nManager', () => {
			const I18nManager = jest.requireActual('react-native/Libraries/ReactNative/I18nManager');
			I18nManager.isRTL = true;
			return I18nManager;
		});

		expect(I18nManager.isRTL).toBe(true);

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<HeaderBackButton />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, HeaderBackButton);

		// expect(wrapper).toMatchSnapshot();

		const styles = wrapper
			.find('HeaderBackButton')
			.last()
			.prop('styles') as any;
		expect(styles.icon.transform[0].scaleX).toBe(-1);
	});
});
