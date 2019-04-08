import { NavigatorProps, RouteConfig } from '@bluebase/core';


export interface RouteConfigWithResolveSubRoutes extends RouteConfig {
	navigator?: NavigatorPropsWithResolvedRoutes,
}

export interface NavigatorPropsWithResolvedRoutes extends NavigatorProps {
	routes: RouteConfigWithResolveSubRoutes[],
}