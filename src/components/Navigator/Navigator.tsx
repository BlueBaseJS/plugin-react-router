import { DrawerNavigator, StackNavigator, SwitchNavigator, TabNavigator } from '../../navigators';
import { NavigatorPropsWithResolvedRoutes, RouteConfigWithResolveSubRoutes } from '../../types';
import { ScreenProps, withScreenProps } from '../../helpers/withScreenProps';

import { NavigatorProps } from '@bluebase/components';
import React from 'react';
import { resolveThunk } from '@bluebase/core';
import { withRouter } from '../../lib';

export interface RRNavigatorProps {
	navigator: NavigatorProps;
	screenProps: ScreenProps;
}

const NavigatorComponent = (props: RRNavigatorProps) => {
	const { navigator, screenProps } = props;
	const { type, routes } = navigator;

	// If routes is a thunk, resolve it
	const resolvedRoutes = resolveThunk<RouteConfigWithResolveSubRoutes[]>(
		routes as any,
		screenProps.BB
	);

	let NavigatorComponent: React.ComponentType<NavigatorPropsWithResolvedRoutes>;

	switch (type) {
		case 'switch':
			NavigatorComponent = SwitchNavigator;
			break;

		case 'stack':
			NavigatorComponent = StackNavigator;
			break;

		case 'tab':
		case 'tabs':
		case 'top-navigation':
		case 'bottom-navigation':
			NavigatorComponent = TabNavigator;
			break;

		case 'drawer':
			NavigatorComponent = DrawerNavigator;
			break;

		default:
			NavigatorComponent = SwitchNavigator;
			break;
	}

	if (!NavigatorComponent) {
		return null;
	}

	return <NavigatorComponent {...navigator} screenProps={screenProps} routes={resolvedRoutes} />;
};

export const Navigator = withScreenProps(
	withRouter(NavigatorComponent as any)
) as React.ComponentType<NavigatorProps>;
