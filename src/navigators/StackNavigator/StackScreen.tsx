import {
	Header,
	NavigationActionsObject,
	NavigationOptions,
	RouteConfig,
	View,
} from '@bluebase/components';
import { MaybeThunk, useTheme } from '@bluebase/core';

import { NavigatorPropsWithResolvedRoutes } from '../../types';
import React from 'react';

export interface StackScreenProps {
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
export const StackScreen = (props: StackScreenProps) => {
	const { theme } = useTheme();
	const { Screen, route, options, navigator, ...rest } = props;

	return (
		<View
			style={{
				backgroundColor: theme.palette.background.default,
				flex: 1,
				height: '100%',
			}}
			testID="stack-screen-root"
		>
			<Header {...options} />
			<View style={{ flex: 1 }}>{Screen ? <Screen {...rest} /> : rest.children}</View>
		</View>
	);
};
