import { BlueBaseApp, BlueBaseTheme } from '@bluebase/core';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import React from 'react';

import { getIcon, getTitle } from '../tabUtils';

describe('DrawerNavigator', () => {
	describe('helpers', () => {
		describe('getTitle', () => {
			it('should return tabBarLabel if available', async () => {
				const node = getTitle(
					{
						tabBarLabel: 'Foo',
						title: 'bar',
						headerTitle: 'baz',
						tabBarOptions: {
							showLabel: true,
						},
					} as any,
					false,
					BlueBaseTheme
				);

				const wrapper = mount(<BlueBaseApp>{node}</BlueBaseApp>);

				await waitForElement(wrapper, '[testID="tab-title"]');

				expect(
					wrapper
						.find('[testID="tab-title"]')
						.last()
						.text()
				).toBe('Foo');
			});

			it('should return fallback to title if tabBarLabel is not available', async () => {
				const node = getTitle(
					{
						// tabBarLabel: 'Foo',
						title: 'bar',
						headerTitle: 'baz',
						tabBarOptions: {
							showLabel: true,
						},
					} as any,
					false,
					BlueBaseTheme
				);

				const wrapper = mount(<BlueBaseApp>{node}</BlueBaseApp>);

				await waitForElement(wrapper, '[testID="tab-title"]');

				expect(
					wrapper
						.find('[testID="tab-title"]')
						.last()
						.text()
				).toBe('bar');
			});

			it('should return fallback to headerTitle if tabBarLabel & title are not available', async () => {
				const node = getTitle(
					{
						// tabBarLabel: 'Foo',
						// title: 'bar',
						headerTitle: 'baz',
						tabBarOptions: {
							showLabel: true,
						},
					} as any,
					true,
					BlueBaseTheme
				);

				const wrapper = mount(<BlueBaseApp>{node}</BlueBaseApp>);

				await waitForElement(wrapper, '[testID="tab-title"]');

				expect(
					wrapper
						.find('[testID="tab-title"]')
						.last()
						.text()
				).toBe('baz');
			});

			it('should return execute tabBarLabel fn and return result', () => {
				expect(
					getTitle({
						tabBarLabel: () => 'foo',
						tabBarOptions: {
							showLabel: true,
						},
					} as any, false, BlueBaseTheme)
				).toBe('foo');
			});

			it('should return undefined for not params', () => {
				expect(getTitle()).toBeUndefined();
			});
		});

		describe('getIcon', () => {
			it('should return undefined if tabBarIcon is not available', () => {
				expect(
					getIcon(
						{
							tabBarIcon: undefined,
						} as any,
						true
					)
				).toBe(undefined);
			});

			it('should return as is if tabBarIcon is an object', () => {
				expect(
					getIcon(
						{
							tabBarIcon: {
								type: 'icon',
								name: 'foo',
							},
							tabBarOptions: {
								showIcon: true,
							},
						} as any,
						true
					)
				).toMatchObject({
					type: 'icon',
					name: 'foo',
				});
			});

			it('should return execute tabBarIcon fn and return result', () => {
				expect(
					getIcon({
						tabBarIcon: () => 'foo',
						tabBarOptions: {
							showIcon: true,
						},
					} as any)
				).toBe('foo');
			});

			it('should return undefined for not params', () => {
				expect(getIcon()).toBeUndefined();
			});

			it('should return undefined if there is no tabBarIcon', () => {
				expect(
					getIcon({
						tabBarOptions: {
							showIcon: true,
						},
					} as any)
				).toBeUndefined();
			});
		});
	});
});
