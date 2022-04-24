import { NavigationActionsProps } from '@bluebase/components';
import React, { useContext } from 'react';

import { historyToActionObject } from '../../helpers/historyToActionObject';
import { RouteComponentProps, withRouter } from '../../lib';
import { MainNavigatorContext } from '../MainNavigatorContext';

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
		const { navigator: mainNavigator } = useContext(MainNavigatorContext);

		const actions = historyToActionObject(rest, mainNavigator);
		return children(actions) as React.ReactElement;
	}
);
