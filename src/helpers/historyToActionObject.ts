import {
	NavigationActionParams,
	NavigationActionsObject,
	NavigatorProps,
} from '@bluebase/components';

import { RouteComponentProps } from '../lib';
import { executeAction } from './executeAction';
import { findRouteByKey } from './findRouteByKey';
import queryString from 'query-string';

export const historyToActionObject = (
	router: RouteComponentProps,
	mainNavigator: NavigatorProps
	// BB: BlueBase
) => {
	// const enableSource: boolean = BB.Configs.getValue(
	// 	'plugin.react-router.enableSourceInNavigationActions'
	// );

	if (!router.match) {
		throw Error('An error occurent in React Router Plugn. We did not find match object');
	}

	const params = { ...router.location.state, ...router.match.params };

	const obj = findRouteByKey(router.match.path, 'path', mainNavigator);

	const actions: NavigationActionsObject = {
		navigate: (routeName, _params?: NavigationActionParams) => {
			return executeAction(mainNavigator, router.history.push, routeName, _params);
		},

		push: (routeName, _params?: NavigationActionParams) => {
			return executeAction(mainNavigator, router.history.push, routeName, _params);
		},

		replace: (routeName, _params?: NavigationActionParams) => {
			return executeAction(mainNavigator, router.history.replace, routeName, _params);
		},

		pop: (steps: number = 0) => {
			router.history.go(steps === 0 ? 0 : steps * -1);
		},

		goBack: () => {
			router.history.goBack();
		},

		setParams: (_params: NavigationActionParams, search: boolean = false) => {
			let searchStr = router.history.location.search;
			if (search) {
				const parsed = queryString.parse(router.history.location.search, { arrayFormat: 'index' });
				const searchItems = {
					...parsed,
				};

				// If items are objects, JSON.stringify them, otherwise use as is
				Object.keys(_params).forEach(
					key =>
						(searchItems[key] =
							typeof _params[key] === 'object' ? JSON.stringify(_params[key]) : _params[key])
				);

				searchStr = queryString.stringify(searchItems, { arrayFormat: 'index' });
			}

			const fn = search ? router.history.push : router.history.replace;
			fn({
				pathname: router.match.path,
				search: searchStr,
				state: { ...params, ..._params },
			});
		},

		getParam: (key: string, defaultValue: any) => {
			return params[key] || defaultValue;
		},

		// source: enableSource ? router : undefined,
		source: router,

		state: {
			key: router.location.key as string,
			params,
			routeName: obj ? obj.name : '',
			search: router.location.search,
			url: router.match.url,
		},
	};

	return actions;
};
