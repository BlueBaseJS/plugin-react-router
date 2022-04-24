import React from 'react';

import { NavigatorPropsWithResolvedRoutes } from '../../types';
import { ModalNavigator } from './ModalNavigator';

export interface StackNavigatorProps extends NavigatorPropsWithResolvedRoutes {
	children: React.ReactNode;
}

export const StackNavigator = (props: StackNavigatorProps) => {
	const { mode, children } = props;

	if (mode === 'modal') {
		return <ModalNavigator {...props} />;
	}

	return children as any;
};

StackNavigator.displayName = 'StackNavigator';
