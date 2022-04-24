import { BlueBaseApp, getComponent } from '@bluebase/core';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';

import Plugin from '../../../';

const HeaderTitle = getComponent('HeaderTitle');

describe('HeaderTitle', () => {
	test('should render simple test', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin]}>
				<HeaderTitle>A very long heading title sentence.</HeaderTitle>
			</BlueBaseApp>
		);

		// Wait for render
		await waitForElement(wrapper as any, HeaderTitle);

		// Should render null
		// expect(wrapper).toMatchSnapshot();
		expect(
			wrapper
				.find('HeaderTitle')
				.last()
				.text()
		).toBe('A very long heading title sentence.');
	});
});
