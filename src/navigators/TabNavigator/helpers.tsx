import { NavigationOptions, Text } from '@bluebase/components';

import React from 'react';
import { isMobile } from '@bluebase/core';

export function getTitle(
	options: NavigationOptions = {},
	tabBarOptions: any = {},
	focused: boolean
) {
	const label = (options as any).tabBarLabel || options.title || options.headerTitle;

	if (!tabBarOptions.showLabel || !label) {
		return;
	}

	const tintColor = focused ? tabBarOptions.activeTintColor : tabBarOptions.inactiveTintColor;

	if (typeof label === 'function') {
		return label({ focused, tintColor });
	}

	return <Text style={{ color: tintColor, ...tabBarOptions.labelStyle }}>{label}</Text>;
}

export function getIcon(
	options: NavigationOptions = {},
	tabBarOptions: any = {},
	focused: boolean
) {
	const icon = (options as any).tabBarIcon;

	if (!tabBarOptions.showIcon || !icon) {
		return;
	}

	if (typeof icon === 'function') {
		return icon({
			focused,
			horizontal: !isMobile(),
			tintColor: focused ? tabBarOptions.activeTintColor : tabBarOptions.inactiveTintColor,
		});
	}

	if (icon && typeof icon.type === 'string') {
		return icon;
	}
}
