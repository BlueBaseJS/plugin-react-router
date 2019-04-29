import { NavigatorProps, RouteConfig } from '@bluebase/components';
import { ScreenProps } from './helpers/withScreenProps';

export interface RouteConfigWithResolveSubRoutes extends RouteConfig {
	navigator?: NavigatorPropsWithResolvedRoutes;
}

export interface NavigatorPropsWithResolvedRoutes extends NavigatorProps {
	routes: RouteConfigWithResolveSubRoutes[];
	screenProps: ScreenProps,
}
