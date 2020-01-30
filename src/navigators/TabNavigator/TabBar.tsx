import {
	BottomNavigation,
	BottomNavigationAction,
	NavigationOptions,
	Tab,
	Tabs,
} from '@bluebase/components';
import { getIcon, getTitle } from './helpers';
import { merge, useTheme } from '@bluebase/core';

import React from 'react';
import { RouteConfigWithResolveSubRoutes } from '../../types';
import { TabViewProps } from './TabView';

export interface TabBarProps extends TabViewProps {
	/**
	 * If true, renders BottomNavigation instead of Tabs
	 */
	bottomNavigation: boolean;
}

export const TabBar = (props: TabBarProps) => {
	const { bottomNavigation, navigation, navigator } = props;
	const { routes } = navigator;
	const { theme } = useTheme();

	const bottomNavigationBaseOptions: any = {
		activeBackgroundColor: theme.palette.background.card,
		activeTintColor: theme.palette.primary.main,
		inactiveBackgroundColor: theme.palette.background.card,
		inactiveTintColor: theme.palette.text.secondary,

		showIcon: true,
		showLabel: true,

		labelStyle: {},
		style: {
			...theme.elevation(8),
		},
		tabStyle: {},
	};

	const topNavigationBaseOptions: any = {
		showIcon: true,
		showLabel: true,

		labelStyle: {},
		style: {},
		tabStyle: {},
	};

	const baseOptions =
		bottomNavigation === true ? bottomNavigationBaseOptions : topNavigationBaseOptions;
	const tabBarOptions: any = merge(baseOptions, navigator.tabBarOptions || {});

	// Resolve active tab index
	const currentRouteName = navigation.state.routeName;
	const currentIndex = navigator.routes.findIndex(route => route.name === currentRouteName);

	const onChange = (_e: any, i: number) => {
		navigation.push(routes[i].name, navigation.state.params);
	};

	const TabbarComponent: any = bottomNavigation === true ? BottomNavigation : Tabs;

	const renderTab = (route: RouteConfigWithResolveSubRoutes, index: number) => {
		const TabComponent: any = bottomNavigation === true ? BottomNavigationAction : Tab;

		const options = route.navigationOptions as NavigationOptions;
		const icon = getIcon(options, tabBarOptions, index === currentIndex);
		const title = getTitle(options, tabBarOptions, index === currentIndex);

		return (
			<TabComponent
				icon={icon}
				label={title}
				value={index as any}
				key={index}
				style={tabBarOptions.tabStyle}
			/>
		);
	};

	return (
		<TabbarComponent
			value={currentIndex}
			onChange={onChange}
			style={{ zIndex: 1100, ...tabBarOptions.style }}
		>
			{navigator.routes.map(renderTab)}
		</TabbarComponent>
	);
};
