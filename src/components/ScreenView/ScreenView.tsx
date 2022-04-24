import { NavigationActionsObject, Noop, RouteConfig } from '@bluebase/components';

import React from 'react';
import { resolveScreenComponent } from '../../helpers';
import { useBlueBase } from '@bluebase/core';

export interface ScreenViewProps {
	children?: React.ReactNode;
	Layout: React.ComponentType<any>;
	route: RouteConfig;
	navigation: NavigationActionsObject;
}

export const ScreenView: React.ComponentType<ScreenViewProps> = ({
	children,
	route,
	Layout,
	...rest
}: ScreenViewProps) => {
	const BB = useBlueBase();
	const ScreenComponent = resolveScreenComponent(route, BB);

	return (
		<Layout Screen={ScreenComponent} {...rest}>
			{children}
		</Layout>
	);
};

ScreenView.defaultProps = {
	Layout: Noop,
};

ScreenView.displayName = 'ScreenView';
