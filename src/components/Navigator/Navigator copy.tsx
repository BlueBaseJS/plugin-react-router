import { RouteConfigWithResolveSubRoutes, ScreenProps } from '../../types';
import { resolveThunk, useBlueBase, useIntl, useTheme } from '@bluebase/core';

import { NavigatorProps } from '@bluebase/components';
import React from 'react';
import { getNavigator } from '../../navigators';

export const Navigator = (props: NavigatorProps) => {
	const { navigator } = props;
	const { type, routes } = navigator;

	const BB = useBlueBase();
	const themes = useTheme();
	const intl = useIntl();
	const screenProps: ScreenProps = { BB, intl, themes, theme: themes.theme };

	const NavigatorComponent = getNavigator(type);

	if (!NavigatorComponent) {
		return null;
	}

	// If routes is a thunk, resolve it
	const resolvedRoutes = resolveThunk<RouteConfigWithResolveSubRoutes[]>(
		routes as any,
		screenProps
	);

	return <NavigatorComponent {...navigator} screenProps={screenProps} routes={resolvedRoutes} />;
};
