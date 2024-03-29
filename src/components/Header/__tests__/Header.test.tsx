import { BlueBaseApp, getComponent } from '@bluebase/core';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';
import { Image, Text } from 'react-native';

import Plugin from '../../../';

import deepmerge = require('deepmerge');

const Header = getComponent('Header');

const Right = () => {
	return <Text testID="right-element">Right</Text>;
};
const Left = () => {
	return <Text testID="left-element">Left</Text>;
};

describe('Header', () => {
	test('should only render back image', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('Header HeaderBackButton Image').exists()).toBe(true);
		expect(wrapper.find('Header [testID="header-back-title"]').length).toBe(0);
	});

	test('should only render back image and title', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header title="Foo" />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('Header HeaderBackButton Image').exists()).toBe(true);
		expect(
			wrapper
				.find('Header [testID="header-title"] Text')
				.last()
				.text()
		).toBe('Foo');
	});

	test('should not render anything when header prop is null', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header header={null} title="Foo" />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		// expect(wrapper).toMatchSnapshot();

		expect(
			wrapper
				.find('Header')
				.last()
				.html()
		).toBe(null);
	});

	test('should render transparent Header', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header title="Foo" headerTransparent />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		// expect(wrapper).toMatchSnapshot();

		const text = wrapper
			.find('Header View')
			.first()
			.prop('style') as any;
		const textStyles = deepmerge.all(text.filter((a: any) => a !== undefined)) as any;

		expect(textStyles.backgroundColor).toBeUndefined();
	});

	test('should not render a back button', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header title="Foo" headerLeft={null} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		// expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('Header HeaderBackButton').length).toBe(0);
		expect(
			wrapper
				.find('Header [testID="header-title"] Text')
				.last()
				.text()
		).toBe('Foo');
	});

	test('should not render a left element', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header title="Foo" headerLeft={<Left />} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('Header Left Text')
				.last()
				.text()
		).toBe('Left');
	});

	test('should not render a back button with custom button text', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header title="Foo" backTitleVisible headerBackTitle="Go Back" />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('Header HeaderBackButton Text')
				.last()
				.text()
		).toBe('Go Back');
		expect(
			wrapper
				.find('Header [testID="header-title"] Text')
				.last()
				.text()
		).toBe('Foo');
	});

	test('should not render a right element', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header title="Foo" headerRight={<Right />} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('Header Right Text')
				.last()
				.text()
		).toBe('Right');
	});

	test('should not render a right element with custom styles', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header
					title="Foo"
					headerRight={<Right />}
					headerRightContainerStyle={{ backgroundColor: 'yellow' }}
				/>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		const view = wrapper
			.find('Header [testID="header-right-container"]')
			.last()
			.prop('style') as any;
		const styles = deepmerge.all(view.filter((a: any) => a !== undefined)) as any;

		// expect(wrapper).toMatchSnapshot();
		expect(styles.backgroundColor).toBe('yellow');
	});

	test('should not render a left element with custom styles', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header
					title="Foo"
					headerRight={<Right />}
					headerLeftContainerStyle={{ backgroundColor: 'orange' }}
				/>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		const view = wrapper
			.find('Header [testID="header-back"]')
			.first()
			.prop('style') as any;
		const styles = deepmerge.all(view.filter((a: any) => a !== undefined)) as any;

		// expect(wrapper).toMatchSnapshot();
		expect(styles.backgroundColor).toBe('orange');
	});

	test('should only render back image and custom truncated title', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header title="Foo" headerRight={<Right />} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		// Update layout
		(wrapper
			.find('Header SafeAreaView')
			.last()
			.prop('onLayout') as any)({
			nativeEvent: { layout: { width: 200 } },
		});
		wrapper.update();

		(wrapper
			.find('Header [testID="header-title"]')
			.last()
			.prop('onLayout') as any)({
			nativeEvent: { layout: { width: 50 } },
		});

		wrapper.update();
		wrapper.update();

		// expect(wrapper).toMatchSnapshot();

		expect(
			wrapper
				.find('Header')
				.last()
				.state('initWidth')
		).toBe(200);
		expect(
			wrapper
				.find('Header')
				.last()
				.state('titleWidth')
		).toBe(50);
		// expect(wrapper.find('Header HeaderTitle[testID="header-title"]').last().prop('width')).toBe(75);
	});

	test('should render back button and title with tint color', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header backTitleVisible headerTintColor="yellow" headerBackTitle="Go Back" title="Foo" />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		// expect(wrapper).toMatchSnapshot();

		const title = wrapper
			.find('HeaderTitle')
			.last()
			.prop('style') as any;
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
		const titleStyles = deepmerge.all(title.filter((a: any) => a !== undefined)) as any;
		const textStyles = deepmerge.all(text.filter((a: any) => a !== undefined)) as any;

		// expect(wrapper).toMatchSnapshot();

		expect(titleStyles.color).toBe('yellow');
		expect(imageStyles.tintColor).toBe('yellow');
		expect(textStyles.color).toBe('yellow');
	});

	test('should render custom title component', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header headerTitle={<Right />} />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		// expect(wrapper).toMatchSnapshot();

		expect(wrapper.find('Header Right').last().length).toBeGreaterThan(0);
	});

	test('should prefer headerTitle prop over title prop', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header headerTitle="Bar" title="Foo" />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		// expect(wrapper).toMatchSnapshot();

		expect(
			wrapper
				.find('Header [testID="header-title"] Text')
				.last()
				.text()
		).toBe('Bar');
	});

	test('should render a header background', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header
					headerTitle="Bar"
					title="Foo"
					// tslint:disable-next-line: max-line-length
					headerBackground={(props: any) => (
						<Image
							testID="header-bg"
							source={{ uri: 'https://picsum.photos/1000x100' }}
							{...props}
						/>
					)}
				/>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		// expect(wrapper).toMatchSnapshot();

		expect(wrapper.find('Header [testID="header-bg"]').length).toBeGreaterThan(0);
	});

	describe('android enviornment', () => {
		beforeEach(() => {
			jest.mock('react-native/Libraries/Utilities/Platform', () => {
				const Platform = (require as any).requireActual(
					'react-native/Libraries/Utilities/Platform'
				);
				Platform.OS = 'android';
				return Platform;
			});
		});

		test('should only render on android platform', async () => {
			const wrapper = mount(
				<BlueBaseApp plugins={[Plugin]}>
					<Header layoutPreset="center" />
				</BlueBaseApp>
			);

			// Wait for render
			await waitForElement(wrapper as any, Header);

			// expect(wrapper).toMatchSnapshot();
			expect(wrapper.find('Header MaskedViewIOS').length).toBe(0);
		});
	});

	test('should handler rtl layout', async () => {
		jest.mock('react-native/Libraries/ReactNative/I18nManager', () => {
			const I18nManager = (require as any).requireActual(
				'react-native/Libraries/ReactNative/I18nManager'
			);
			I18nManager.isRTL = true;
			return I18nManager;
		});

		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<Header />
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, Header);

		// expect(wrapper).toMatchSnapshot();

		const styles = wrapper
			.find('Header')
			.last()
			.prop('styles') as any;
		expect(styles.iconMask.transform[0].scaleX).toBe(-1);
	});
});
