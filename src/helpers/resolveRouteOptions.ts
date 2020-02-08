import { NavigationActionsObject, NavigatorProps, RouteConfig } from '@bluebase/components';

import { ScreenProps } from '../types';
import { resolveThunk } from '@bluebase/core';

export const resolveRouteOptions = (
	route: RouteConfig,
	navigator: NavigatorProps,
	mainNavigator: NavigatorProps,
	ctx: {
		navigation: NavigationActionsObject;
		screenProps: ScreenProps;
	}
) => {
	// // Extract screenProps
	// const screenProps: ScreenProps = {
	// 	...mainNavigator.screenProps,
	// 	...params.screenProps
	// };

	// Create navigationOptions from main navigation configs
	let navigationOptions = resolveThunk(mainNavigator.defaultNavigationOptions || {}, {
		...ctx,
		navigationOptions: {},
	});

	// Create navigationOptions from navigatior defaultNavigationOptions
	navigationOptions = resolveThunk(navigator.defaultNavigationOptions || navigationOptions, {
		...ctx,
		navigationOptions,
	});

	// Now, create navigationOptions from route's navigationOptions object
	navigationOptions = resolveThunk(route.navigationOptions || navigationOptions, {
		...ctx,
		navigationOptions,
	});

	// And finally, create navigationOptions from route.screen NavigationOptions
	navigationOptions = resolveThunk(
		(route.screen && (route.screen as any).navigationOptions) || navigationOptions,
		{ ...ctx, navigationOptions }
	);

	// Phew...
	return navigationOptions;
};
