import { Text } from '@bluebase/components';
import { BlueBaseTheme, isMobile, Theme } from '@bluebase/core';
import React from 'react';

export const getTitle = (options: any = {}, focused: boolean = false, theme: Theme = BlueBaseTheme) => {
	const { tabBarOptions = {} } = options as any;

	const label = (options as any).tabBarLabel || options.title || options.headerTitle;

	if (!tabBarOptions.showLabel || !label) {
		return;
	}

	const activeTintColor = tabBarOptions.activeTintColor || theme.palette.text.primary;
	const inactiveTintColor = tabBarOptions.inactiveTintColor || theme.palette.text.secondary;
	const tintColor = focused ? activeTintColor : inactiveTintColor;

	if (typeof label === 'function') {
		return label({ focused, tintColor });
	}

	return (
		<Text testID="tab-title" style={{ color: tintColor, ...tabBarOptions.labelStyle }}>
			{label}
		</Text>
	);
};

export const getIcon = (options: any = {}, focused: boolean = false, theme: Theme = BlueBaseTheme) => {
	const { tabBarOptions = {} } = options as any;
	const icon = (options as any).tabBarIcon;

	if (!tabBarOptions.showIcon) {
		return;
	}

	const activeTintColor = tabBarOptions.activeTintColor || theme.palette.text.primary;
	const inactiveTintColor = tabBarOptions.inactiveTintColor || theme.palette.text.secondary;
	const tintColor = focused ? activeTintColor : inactiveTintColor;

	if (typeof icon === 'function') {
		return icon({
			focused,
			horizontal: !isMobile(),
			tintColor,
		});
	}

	if (icon && typeof icon.type === 'string') {
		return icon;
	}
};
