import { ModalNavigator } from './ModalNavigator';
import { NavigatorPropsWithResolvedRoutes } from '../../types';
import React from 'react';

export const StackNavigator = (
	props: NavigatorPropsWithResolvedRoutes & { children: React.ReactNode }
) => {
	const { mode, children } = props;

	if (mode === 'modal') {
		return <ModalNavigator {...props} />;
	}

	return children;
};
