import { NavigatorPropsWithResolvedRoutes, RouteConfigWithResolveSubRoutes } from '../../types';
import React, { useContext } from 'react';
import { Tab, Tabs, View } from '@bluebase/components';
import { getIcon, getTitle, resolveRouteOptions, useScreenProps } from '../../helpers';
import { merge, useNavigation, useTheme } from '@bluebase/core';

import { MainNavigatorContext } from '../../components';
import { compile } from 'path-to-regexp';
import get from 'lodash.get';
import { useLocation } from 'react-router-dom';

const baseOptions: any = {
	showIcon: true,
	showLabel: true,

	labelStyle: {},
	style: {},
	tabStyle: {},
};

export const TabNavigator = (
	props: NavigatorPropsWithResolvedRoutes & { children: React.ReactNode }
) => {
	const { children, routes } = props;

	// Extract Contexts
	const { theme } = useTheme();
	const location = useLocation();

	const mainNavigator = useContext(MainNavigatorContext);

	const navigation = useNavigation();
	const screenProps = useScreenProps();

	// Options
	const tabBarOptions: any = merge(baseOptions, props.tabBarOptions || {});

	// Resolve active tab index
	const currentIndex = routes.findIndex((route: RouteConfigWithResolveSubRoutes) => {
		const toPath = compile(route.path);
		return toPath(get(location, 'state', {})!) === location.pathname;
	});

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

		return (
			<Tab
				icon={icon}
				label={title}
				value={index as any}
				key={index}
				styles={{
					// hardcoded for material-ui
					root: { minWidth: 'auto' },
					wrapper: tabBarOptions.tabStyle,
					labelIcon: {
						minHeight: 48,
						paddingTop: 6,

						'& $wrapper > *:first-child': {
							marginBottom: 0,
							margin: '0 4px',
						},
					},
				}}
			/>
		);
	};

	return (
		<View
			style={{
				backgroundColor: theme.palette.background.default,
				flex: 1,
			}}
		>
			<View
				style={[
					{
						backgroundColor: theme.palette.background.card,
					},
					tabBarOptions.style,
				]}
			>
				<Tabs value={currentIndex > -1 ? currentIndex : 0} onChange={onChange}>
					{routes.map(renderTab)}
				</Tabs>
			</View>
			<View style={{ flex: 1 }}>{children}</View>
		</View>
	);
};

TabNavigator.displayName = 'TabNavigator';
