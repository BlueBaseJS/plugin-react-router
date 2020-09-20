import { NavigationActionsObject, NavigatorProps, RouteConfig } from '@bluebase/components';

import { ScreenProps } from '../types';
import get from 'lodash.get';
import { resolveThunk } from '@bluebase/core';

export const resolveRouteOptions = (
	route: RouteConfig,
	navigator: NavigatorProps,
	mainNavigator: NavigatorProps,
	ctx: {
		navigation: NavigationActionsObject;
		screenProps: ScreenProps;
		route: any;
	}
) => {
	// // Extract screenProps
	// const screenProps: ScreenProps = {
	// 	...mainNavigator.screenProps,
	// 	...params.screenProps
	// };

	// Create navigationOptions from main navigation configs
	let navigationOptions = resolveThunk(get(mainNavigator, 'defaultNavigationOptions', {}), {
		...ctx,
		navigationOptions: {},
	});

	// Create navigationOptions from navigatior defaultNavigationOptions
	navigationOptions = resolveThunk(get(navigator, 'defaultNavigationOptions', navigationOptions), {
		...ctx,
		navigationOptions,
	});

	// Now, create navigationOptions from route's navigationOptions object
	navigationOptions = resolveThunk(route.options || route.navigationOptions || navigationOptions, {
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
