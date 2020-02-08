import React from 'react';
import { Text } from '@bluebase/components';
import { isMobile } from '@bluebase/core';

export const getTitle = (options: any = {}, focused: boolean) => {
	const { tabBarOptions } = options as any;

	const label = (options as any).tabBarLabel || options.title || options.headerTitle;

	if (!tabBarOptions.showLabel || !label) {
		return;
	}

	const tintColor = focused ? tabBarOptions.activeTintColor : tabBarOptions.inactiveTintColor;

	if (typeof label === 'function') {
		return label({ focused, tintColor });
	}

	return <Text style={{ color: tintColor, ...tabBarOptions.labelStyle }}>{label}</Text>;
};

export const getIcon = (options: any = {}, focused: boolean) => {
	const { tabBarOptions } = options as any;
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
};
