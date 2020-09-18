import {
	DrawerItem,
	DrawerLayout,
	DrawerSection,
	SafeAreaView,
	ScrollView,
	View,
} from '@bluebase/components';
import { NavigatorPropsWithResolvedRoutes, RouteConfigWithResolveSubRoutes } from '../../types';
import React, { useContext } from 'react';
import { getIcon, getTitle } from './helpers';
import { resolveRouteOptions, useScreenProps } from '../../helpers';
import { useNavigation, useTheme } from '@bluebase/core';

import { MainNavigatorContext } from '../../components';
import { useLocation } from 'react-router-dom';

export const DrawerNavigator = (
	props: NavigatorPropsWithResolvedRoutes & { children: React.ReactNode }
) => {
	const { children, routes, contentComponent: ContentComponent } = props;

	// Extract Contexts
	const { theme } = useTheme();
	const location = useLocation();

	const mainNavigator = useContext(MainNavigatorContext);

	const navigation = useNavigation();
	const screenProps = useScreenProps();

	// Resolve active tab index
	const currentIndex = routes.findIndex(
		(route: RouteConfigWithResolveSubRoutes) => route.path === location.pathname
	);

	// Navigation State
	const navigationState = {
		index: currentIndex,
		routes: routes.map((route: RouteConfigWithResolveSubRoutes, index: number) => {
			const options = resolveRouteOptions(route, props, mainNavigator, {
				navigation,
				screenProps,
				route: { ...route, params: navigation.state.params },
			});

			return {
				index,
				options,
				path: route.path,
				routeName: route.name,
			};
		}),
	};

	const renderNavigationView = () => {
		const { routes: navRoutes } = navigationState;

		if (ContentComponent) {
			return <ContentComponent navigation={navigation} />;
		}

		return (
			<ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
				<SafeAreaView>
					<DrawerSection>
						{navRoutes.map((r: any) => {
							const title = getTitle(r.options);
							const icon = getIcon(r.options);
							const onPress = () => navigation.navigate(r.routeName, navigation.state.params);

							return <DrawerItem key={r.routeName} title={title} icon={icon} onPress={onPress} />;
						})}
					</DrawerSection>
				</SafeAreaView>
			</ScrollView>
		);
	};

	return (
		<View
			style={{
				backgroundColor: theme.palette.background.default,
				flex: 1,
			}}
		>
			<DrawerLayout {...props} renderNavigationView={renderNavigationView}>
				{children}
			</DrawerLayout>
		</View>
	);
};

DrawerNavigator.displayName = 'DrawerNavigator';
