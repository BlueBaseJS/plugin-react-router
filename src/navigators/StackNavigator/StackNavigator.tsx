import { ModalNavigator } from './ModalNavigator';
import { NavigatorPropsWithResolvedRoutes } from '../../types';
import React from 'react';

export interface StackNavigatorProps extends NavigatorPropsWithResolvedRoutes {
	children: React.ReactNode;
}

export const StackNavigator = (props: StackNavigatorProps) => {
	const { mode, children } = props;

	if (mode === 'modal') {
		return <ModalNavigator {...props} />;
	}

	return children;
};
