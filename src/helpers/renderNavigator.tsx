import { BlueBase, resolveThunk } from '@bluebase/core';
import { DrawerNavigator, StackNavigator, SwitchNavigator, TabNavigator } from '../navigators';
import { NavigatorPropsWithResolvedRoutes, RouteConfigWithResolveSubRoutes } from '../types';
import { NavigatorProps } from '@bluebase/components';
import React from 'react';

export function renderNavigator(navigator: NavigatorProps, BB: BlueBase) {

	const { type, routes } = navigator;

  // If routes is a thunk, resolve it
	const resolvedRoutes = resolveThunk<RouteConfigWithResolveSubRoutes[]>(routes as any, BB);

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

	return (
    <NavigatorComponent {...navigator} routes={resolvedRoutes} />
	);
}