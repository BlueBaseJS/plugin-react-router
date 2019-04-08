import { BlueBaseConsumer } from '@bluebase/core';
import React from 'react';
import { historyToActionObject } from './helpers/historyToActionObject';
import { withRouter } from './lib';

export const NavigationActions = withRouter((props: any) => {
	const { children, ...rest } = props;

	return (
		<BlueBaseConsumer>
		{(BB) => {
			const actions = historyToActionObject(rest, BB);
			return children(actions);
		}}
		</BlueBaseConsumer>
	);
});