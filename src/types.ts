import { BlueBase, IntlContextData, Theme, ThemeContextData } from '@bluebase/core';
import { NavigatorProps, RouteConfig } from '@bluebase/components';

export interface ScreenProps {
	BB: BlueBase;
	themes: ThemeContextData;
	intl: IntlContextData;

	// Backwards Compat
	theme: Theme;
}

export interface RouteConfigWithResolveSubRoutes extends RouteConfig {
	navigator?: NavigatorPropsWithResolvedRoutes;
}

export interface NavigatorPropsWithResolvedRoutes extends NavigatorProps {
	routes: RouteConfigWithResolveSubRoutes[];
	// screenProps: ScreenProps;
}
