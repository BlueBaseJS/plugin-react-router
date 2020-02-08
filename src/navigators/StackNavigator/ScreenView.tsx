import { Header, NavigationActionsObject, NavigationOptions, View } from '@bluebase/components';
import { MaybeThunk, Theme } from '@bluebase/core';
import { StyleProp, ViewStyle } from 'react-native';

import { NavigatorPropsWithResolvedRoutes } from '../../types';
import React from 'react';

export interface ScreenViewStyles {
	content: StyleProp<ViewStyle>;
	root: StyleProp<ViewStyle>;
}

export interface ScreenViewProps {
	/**
	 * Navigation Options
	 */
	navigationOptions?: MaybeThunk<NavigationOptions>;

	/**
	 * This is the screen component. This is the main view of the route.
	 */
	screen?: React.ComponentType<any>;

	/**
	 * Navigation actions
	 */
	navigation: NavigationActionsObject;

	/**
	 * Parent navigator props
	 */
	navigator: NavigatorPropsWithResolvedRoutes;

	/**
	 * This is normally a nested navigator
	 */
	children: React.ReactNode;

	/**
	 * Themed styles
	 */
	styles?: ScreenViewStyles;
}

/**
 * Screen component, renders a screen with a header
 * @param props
 */
export const ScreenView = (props: ScreenViewProps) => {
	const { screen: Screen, navigationOptions, navigator, styles, ...rest } = props;
	const stylesheet = styles as ScreenViewStyles;

	const options = navigationOptions as NavigationOptions;

	return (
		<View style={stylesheet.root}>
			<Header {...options} />
			<View style={stylesheet.content}>{Screen ? <Screen {...rest} /> : rest.children}</View>
		</View>
	);
};

ScreenView.defaultStyles = (theme: Theme) => ({
	content: {
		flex: 1,
	},
	root: {
		backgroundColor: theme.palette.background.default,
		flex: 1,
		height: '100%',
	},
});
