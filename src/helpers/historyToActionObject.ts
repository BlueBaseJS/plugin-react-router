import {
	BlueBase,
	NavigationActionParams,
	NavigationActionsObject,
	NavigatorProps,
} from '@bluebase/core';
import { RouteComponentProps } from '../lib';
import { executeAction } from './executeAction';
import { findRouteByKey } from './findRouteByKey';

export const historyToActionObject = (router: RouteComponentProps, BB: BlueBase) => {
	const configs: NavigatorProps = BB.Configs.getValue('plugin.react-router.navigationConfigs');
	const enableSource: boolean = BB.Configs.getValue(
		'plugin.react-router.enableSourceInNavigationActions'
	);

	if (!router.match) {
		throw Error('An error occurent in React Router Plugn. We did not find match object');
	}

	const params = { ...router.location.state, ...router.match.params };

	const obj = findRouteByKey(router.match.path, 'path', configs);

	const actions: NavigationActionsObject = {
		navigate: (routeName, _params?: NavigationActionParams) => {
			return executeAction(configs, router.history.push, routeName, _params);
		},

		push: (routeName, _params?: NavigationActionParams) => {
			return executeAction(configs, router.history.push, routeName, _params);
		},

		replace: (routeName, _params?: NavigationActionParams) => {
			return executeAction(configs, router.history.replace, routeName, _params);
		},

		pop: (steps: number = 0) => {
			router.history.go(steps === 0 ? 0 : steps * -1);
		},

		goBack: () => {
			router.history.goBack();
		},

		setParams: (_params: NavigationActionParams) => {
			router.history.replace(router.match.path, { ...params, ..._params });
		},

		getParam: (key: string, defaultValue: any) => {
			return params[key] || defaultValue;
		},

		source: enableSource ? router : undefined,

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
