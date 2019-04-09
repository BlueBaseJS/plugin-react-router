import { RouteComponentProps, withRouter } from '../../lib';
import { BlueBaseConsumer } from '@bluebase/core';
import { NavigationActionsProps } from '@bluebase/components';
import React from 'react';
import { historyToActionObject } from '../../helpers/historyToActionObject';

type NavigationActionsWithRouter = NavigationActionsProps & RouteComponentProps;

/**
 * NavigationActions
 * This is a render prop component which passes the navigation actions
 * to the child component. It's useful when you cannot pass the navigation
 * actions into the component directly, or don't want to pass it in case
 * of a deeply nested child.
 */
export const NavigationActions = withRouter(({ children, ...rest }: NavigationActionsWithRouter) => (
	<BlueBaseConsumer>
	{(BB) => {
		const actions = historyToActionObject(rest, BB);
		return children(actions);
	}}
	</BlueBaseConsumer>
));