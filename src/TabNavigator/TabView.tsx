import {
	MaybeThunk,
	NavigationActionsObject,
	NavigationOptions,
	Theme,
	View,
	getComponent,
	resolveThunk,
} from '@bluebase/core';
import { StyleProp, ViewStyle } from 'react-native';
import { NavigatorPropsWithResolvedRoutes } from './Navigators/types';
import React from 'react';

export interface ScreenStyles {
	root: StyleProp<ViewStyle>
}

export interface TabViewProps {
	navigationOptions?: MaybeThunk<NavigationOptions>,
	component?: React.ComponentType<any>,
	navigation: NavigationActionsObject,
	navigator: NavigatorPropsWithResolvedRoutes,
	children: React.ReactNode,
	styles?: ScreenStyles
}

const BottomNavigation = getComponent('BottomNavigation');
const TabBar = getComponent('TabBar');

const TabViewContent = ({ children }: any) => (
	<View style={{ flex: 1 }}>{children}</View>
);

export const TabView = (props: TabViewProps) => {

	const { component, navigationOptions, navigator, styles, ...rest } = props;
	const stylesheet = styles as ScreenStyles;

	const Component = component || TabViewContent;

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
				routeName: route.name,
				title: options.title,
			};
		})
	};

	if (navigator.type === 'bottom-tab') {
		return (
			<View style={stylesheet.root}>
				<Component {...rest} />
				<BottomNavigation navigationState={navigationState} />
			</View>
		);
	}

	return (
		<View style={stylesheet.root}>
			<TabBar navigationState={navigationState} />
			<Component {...rest} />
		</View>
	);
};

TabView.defaultStyles = (theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		flex: 1,
	}
});
