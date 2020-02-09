import React, { useContext } from 'react';
import { RouteComponentProps, withRouter } from '../../lib';

import { MainNavigatorContext } from '../Navigation';
import { NavigationActionsProps } from '@bluebase/components';
import { historyToActionObject } from '../../helpers/historyToActionObject';

type NavigationActionsWithRouter = NavigationActionsProps & RouteComponentProps;

/**
 * NavigationActions
 * This is a render prop component which passes the navigation actions
 * to the child component. It's useful when you cannot pass the navigation
 * actions into the component directly, or don't want to pass it in case
 * of a deeply nested child.
 */
export const NavigationActions: React.ComponentType<NavigationActionsProps> = withRouter(
	({ children, ...rest }: NavigationActionsWithRouter) => {
		const mainNavigatorConfigs = useContext(MainNavigatorContext);

		const actions = historyToActionObject(rest, mainNavigatorConfigs);
		return children(actions) as React.ReactElement;
	}
);
