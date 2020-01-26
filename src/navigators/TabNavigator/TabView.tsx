import { MaybeThunk, Theme, getComponent } from '@bluebase/core';
import { NavigationActionsObject, NavigationOptions, View } from '@bluebase/components';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';

import { NavigatorPropsWithResolvedRoutes } from '../../types';
import React from 'react';

export interface TabViewStyles {
	content: StyleProp<ViewStyle>;
	root: StyleProp<ViewStyle>;
}

export interface TabViewProps {
	navigationOptions?: MaybeThunk<NavigationOptions>;
	screen?: React.ComponentType<any>;
	navigation: NavigationActionsObject;
	navigator: NavigatorPropsWithResolvedRoutes;
	children: React.ReactNode;
	styles?: TabViewStyles;
}

// const BottomNavigation = getComponent('BottomNavigation');
const TabBar = getComponent('TabBar');

export const TabView = (props: TabViewProps) => {
	const { screen: Screen, navigator, styles, ...rest } = props;
	const stylesheet = styles as TabViewStyles;

	const bottomNavigation = navigator.type === 'bottom-navigation' ? true : false;

	if (bottomNavigation) {
		return (
			<View style={stylesheet.root}>
				<View style={stylesheet.content}>
					<ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
						{Screen ? <Screen {...rest} /> : rest.children}
					</ScrollView>
				</View>
				<TabBar bottomNavigation {...props} />
			</View>
		);
	}
	return (
		<View style={stylesheet.root}>
			<TabBar bottomNavigation={false} {...props} />
			<View style={stylesheet.content}>{Screen ? <Screen {...rest} /> : rest.children}</View>
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
	},
});
