import {
	DrawerItem,
	NavigationActions,
	NavigationActionsObject,
	NavigationOptions,
	View,
} from '@bluebase/components';
import {
	MaybeThunk,
	Theme,
	getComponent,
} from '@bluebase/core';
import { SafeAreaView, ScrollView } from 'react-native';
import { NavigatorPropsWithResolvedRoutes } from '../../types';
import React from 'react';
import { ScreenViewStyles } from '../StackNavigator';

export interface DrawerViewProps {
	navigationOptions?: MaybeThunk<NavigationOptions>,
	screen?: React.ComponentType<any>,
	navigation: NavigationActionsObject,
	navigator: NavigatorPropsWithResolvedRoutes,
	children: React.ReactNode,
	styles?: ScreenViewStyles
}

const DrawerLayout = getComponent('DrawerLayout');

const DrawerNavigationView = (props: any) => () => {

	const { navigationState } = props;
	const { routes } = navigationState;

	return (
		<ScrollView>
			<SafeAreaView>
				<NavigationActions>
					{({ navigate, state }) => {

						return routes.map((r: any) => (
							<DrawerItem key={r.routeName} title={r.title} onPress={() => navigate(r.routeName, state.params)} />
						));
					}}
				</NavigationActions>
			</SafeAreaView>
		</ScrollView>
	);
};

export const DrawerView = (props: DrawerViewProps) => {

	const { screen: component, navigationOptions, navigator, styles, ...rest } = props;
	const { contentOptions, routes, type, ...other } = navigator;

	const stylesheet = styles as ScreenViewStyles;

	const Component = component; // || DrawerViewContent;

	// Resolve active tab index
	const currentRouteName = props.navigation.state.routeName;
	const currentIndex = navigator.routes.findIndex(route => route.name === currentRouteName);

	// Navigation State
	const navigationState = {
		index: currentIndex,
		routes: navigator.routes.map((route, index) => {

			const options = route.navigationOptions as NavigationOptions;

			return {
				index,
				path: route.path,
				routeName: route.name,
				title: options.title,
			};
		})
	};

	return (
	 		<View style={stylesheet.root}>
				<DrawerLayout {...other} renderNavigationView={DrawerNavigationView({ ...props, navigationState })}>
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
