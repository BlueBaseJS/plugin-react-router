import { BottomNavigation, BottomNavigationAction, View } from '@bluebase/components';
import { NavigatorPropsWithResolvedRoutes, RouteConfigWithResolveSubRoutes } from '../../types';
import React, { useContext } from 'react';
import { getIcon, getTitle, resolveRouteOptions, useScreenProps } from '../../helpers';
import { merge, useNavigation, useTheme } from '@bluebase/core';

import { MainNavigatorContext } from '../../components';
import { useLocation } from 'react-router-dom';

export const BottomNavigationNavigator = (
	props: NavigatorPropsWithResolvedRoutes & { children: React.ReactNode }
) => {
	const { children, routes } = props;

	// Extract Contexts
	const { theme } = useTheme();
	const location = useLocation();

	const { navigator: mainNavigator } = useContext(MainNavigatorContext);

	const navigation = useNavigation();
	const screenProps = useScreenProps();

	// Options

	const baseOptions: any = {
		activeBackgroundColor: theme.palette.background.card,
		activeTintColor: theme.palette.primary.main,
		inactiveBackgroundColor: theme.palette.background.card,
		inactiveTintColor: theme.palette.text.secondary,

		showIcon: true,
		showLabel: true,

		labelStyle: {},

		tabStyle: {},
	};

	const tabBarOptions: any = merge(baseOptions, props.tabBarOptions || {});

	// Resolve active tab index
	const currentIndex = routes.findIndex(
		(route: RouteConfigWithResolveSubRoutes) => route.path === location.pathname
	);

	// onChange listener
	const onChange = (_e: any, i: number) => {
		navigation.push(routes[i].name, navigation.state.params);
	};

	// Render single tab
	const renderTab = (route: RouteConfigWithResolveSubRoutes, index: number) => {
		const options = resolveRouteOptions(route, props, mainNavigator, {
			navigation,
			screenProps,
			route: { ...route, params: navigation.state.params },
		});

		const icon = getIcon(
			merge<any>({ headerTitle: route.name, ...options }, { tabBarOptions }),
			index === currentIndex
		);

		const title = getTitle(
			merge<any>({ headerTitle: route.name, ...options }, { tabBarOptions }),
			index === currentIndex
		);

		return <BottomNavigationAction icon={icon} label={title} value={index as any} key={index} />;
	};

	return (
		<View
			style={{
				backgroundColor: theme.palette.background.default,
				flex: 1,
			}}
		>
			<View style={{ flex: 1 }}>{children}</View>
			<BottomNavigation
				value={currentIndex > -1 ? currentIndex : 0}
				onChange={onChange}
				style={{ zIndex: 1100, ...tabBarOptions.style } as any}
			>
				{routes.map(renderTab)}
			</BottomNavigation>
		</View>
	);
};

BottomNavigationNavigator.displayName = 'BottomNavigationNavigator';
