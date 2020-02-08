import { NavigationActionsObject, NavigationOptions, RouteConfig } from '@bluebase/components';

import { MaybeThunk } from '@bluebase/core';
import { NavigatorPropsWithResolvedRoutes } from '../../types';
import React from 'react';

export interface SwitchScreenProps {
	Screen: React.ComponentType<any>;

	/**
	 * Navigation Options
	 */
	options?: MaybeThunk<NavigationOptions>;

	/**
	 * Navigation actions
	 */
	navigation: NavigationActionsObject;

	/**
	 * Parent navigator props
	 */
	navigator: NavigatorPropsWithResolvedRoutes;

	/**
	 * Parent navigator props
	 */
	route: RouteConfig;

	/**
	 * This is normally a nested navigator
	 */
	children: React.ReactNode;
}

/**
 * Screen component, renders a screen with a header
 * @param props
 */
export const SwitchScreen = (props: SwitchScreenProps) => {
	const { Screen, route, options, navigator, ...rest } = props;
	return Screen ? <Screen {...rest} /> : rest.children;
};
