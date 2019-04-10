import { MaybeThunk, Theme, getComponent } from '@bluebase/core';
import { NavigationActionsObject, NavigationOptions, View } from '@bluebase/components';
import { StyleProp, ViewStyle } from 'react-native';
import { NavigatorPropsWithResolvedRoutes } from '../../types';
import React from 'react';


export interface TabViewStyles {
	content: StyleProp<ViewStyle>;
	root: StyleProp<ViewStyle>;
}

export interface TabViewProps {
	navigationOptions?: MaybeThunk<NavigationOptions>,
	screen?: React.ComponentType<any>,
	navigation: NavigationActionsObject,
	navigator: NavigatorPropsWithResolvedRoutes,
	children: React.ReactNode,
	styles?: TabViewStyles
}

// const BottomNavigation = getComponent('BottomNavigation');
const TabBar = getComponent('TabBar');


export const TabView = (props: TabViewProps) => {

	const { screen: Screen, navigationOptions, navigator, styles, ...rest } = props;
	const stylesheet = styles as TabViewStyles;

	const bottomNavigation = (navigator.type === 'bottom-navigation') ? true : false;

	return (
		<View style={stylesheet.root}>
			{!bottomNavigation && <TabBar bottomNavigation={bottomNavigation} {...props} />}
			<View style={stylesheet.content}>
				{Screen ? <Screen {...rest} /> : rest.children}
			</View>
			{bottomNavigation && <TabBar bottomNavigation={bottomNavigation} {...props} />}
		</View>
	);
};

TabView.defaultStyles = (theme: Theme) => ({
	content: {
		flex: 1,
	},
	root: {
		backgroundColor: theme.palette.background.default,
		flex: 1,
	}
});
