/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { NavigatorProps, RouteConfig } from '@bluebase/components';

import { resolveThunk } from '@bluebase/core';

/**
 * This function is this plugin's dog 🐶. Give it a bone and it will find it from
 * the depths of hell.
 *
 * Translation: Finds a route object by a key and value search, from a
 * nested NavigatorProps object.
 *
 * @param search
 * @param key
 * @param configs
 */
export function findRouteByKey(
	search: string,
	key: string,
	configs: NavigatorProps
): RouteConfig | null {
	// This is where we will store our prized posession
	let found = null;

	// If routes prop is a thunk, resolve it
	const routes = resolveThunk(configs.routes);

	// Iterate the routes array to commence 🧙‍♀️ witch hunt!
	for (const route of routes) {
		// If key and value match, call off the search and get yourself a drink 🥤!
		if (route[key] === search) {
			found = route;
			break;
		}

		// If this route has a nested navigator, go deep!
		if (route.navigator && route.navigator.routes) {
			found = findRouteByKey(search, key, route.navigator);

			// If recursive search is successful, do the break dance!
			if (found) {
				break;
			}
		}
	}

	// Return with the hopes of a newer better tomorrow
	return found;
}
