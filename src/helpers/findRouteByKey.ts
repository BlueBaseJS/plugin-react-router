import {
	NavigatorProps,
	RouteConfig,
} from '@bluebase/core';

export function findRouteByKey(search: string, key: string, configs: NavigatorProps): RouteConfig | null {

	let found = null;
	const routes = configs.routes as RouteConfig[];

	for (const route of routes) {
		if (route[key] === search) {
			found = route;
			break;
		}

		if (route.navigator && route.navigator.routes) {
			found = findRouteByKey(search, key, route.navigator);

			if (found) {
				break;
			}
		}
	}


	return found;
}