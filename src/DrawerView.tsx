import { DrawerItem, NavigationActions } from '@bluebase/components';
import {
	MaybeThunk,
	NavigationActionsObject,
	NavigationOptions,
	Theme,
	View,
	getComponent,
	resolveThunk,
} from '@bluebase/core';
import { SafeAreaView, ScrollView, StyleProp,  ViewStyle } from 'react-native';
import { NavigatorPropsWithResolvedRoutes } from './Navigators/types';
import React from 'react';

export interface ScreenStyles {
	root: StyleProp<ViewStyle>
}

export interface DrawerViewProps {
	navigationOptions?: MaybeThunk<NavigationOptions>,
	component?: React.ComponentType<any>,
	navigation: NavigationActionsObject,
	navigator: NavigatorPropsWithResolvedRoutes,
	children: React.ReactNode,
	styles?: ScreenStyles
}

const DrawerLayout = getComponent('DrawerLayout');

const DrawerNavigationView = (props: any) => {

	const { navigationState } = props;
	const { index, routes } = navigationState;

	return (
		<ScrollView>
			<SafeAreaView>
				<NavigationActions>
					{({ navigate }) => {

						return routes.map(r => (
							<DrawerItem key={r.routeName} title={r.title} onPress={() => navigate(r.routeName)} />
						));
					}}
				</NavigationActions>
			</SafeAreaView>
		</ScrollView>
	);
};

export const DrawerView = (props: DrawerViewProps) => {

	const { component, navigationOptions, navigator, styles, ...rest } = props;
	const { contentOptions, routes, type, ...other } = navigator;

	const stylesheet = styles as ScreenStyles;

	const Component = component; // || DrawerViewContent;

	// Resolve active tab index
	const currentRouteName = props.navigation.state.routeName;
	const currentIndex = navigator.routes.findIndex(route => route.name === currentRouteName);

	// Navigation State
	const navigationState = {
		index: currentIndex,
		routes: navigator.routes.map((route, index) => {

			// Resolve navigationOptions
			const options = resolveThunk(
				route.navigationOptions || {},
				{
					navigation: props.navigation,
					screenProps: rest
				}
			);

			return {
				index,
				path: route.path,
				routeName: route.name,
				title: options.title,
			};
		})
	};

	// return (
	// 	<View style={stylesheet.root}>
	// 		<TabBar navigationState={navigationState} />
	// 		<Component {...rest} />
	// 	</View>
	// );

	return (
	 		<View style={stylesheet.root}>
				<DrawerLayout {...other} navigationState={navigationState} renderNavigationView={DrawerNavigationView}>
					{Component ? <Component {...rest} /> : null}
				</DrawerLayout>
			</View>
	);
};

DrawerView.defaultStyles = (theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		flex: 1,
	}
});
