import {
  BlueBase,
  NavigatorProps,
  resolveThunk,
} from '@bluebase/core';
import {
   NavigatorPropsWithResolvedRoutes,
   RouteConfigWithResolveSubRoutes,
} from '../types';
import { DrawerNavigator } from '../Navigators/DrawerNavigator';
import React from 'react';
import { StackNavigator } from '../Navigators/StackNavigator';
import { SwitchNavigator } from '../Navigators/SwitchNavigator';
import { TabNavigator } from '../TabNavigator';

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
		case 'top-tab':
			NavigatorComponent = TabNavigator;
			break;

		case 'bottom-tab':
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