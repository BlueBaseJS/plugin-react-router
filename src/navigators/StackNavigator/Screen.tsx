import { Header, NavigationActionsObject, NavigationOptions, View } from '@bluebase/components';
import { MaybeThunk, Theme, resolveThunk } from '@bluebase/core';
import { StyleProp, ViewStyle } from 'react-native';
import { NavigatorPropsWithResolvedRoutes } from '../../types';
import React from 'react';

export interface ScreenStyles {
	content: StyleProp<ViewStyle>;
	root: StyleProp<ViewStyle>;
}

export interface ScreenProps {
	/**
	 * Navigation Options
	 */
	navigationOptions?: MaybeThunk<NavigationOptions>,

	/**
	 * This is the screen component. This is the main view of the route.
	 */
	screen?: React.ComponentType<any>,

	/**
	 * Navigation actions
	 */
	navigation: NavigationActionsObject,

	/**
	 * Parent navigator props
	 */
	navigator: NavigatorPropsWithResolvedRoutes,

	/**
	 * This is normally a nested navigator
	 */
	children: React.ReactNode,

	/**
	 * Themed styles
	 */
	styles?: ScreenStyles
}

/**
 * Screen component, renders a screen with a header
 * @param props
 */
export const Screen = (props: ScreenProps) => {

	const { screen: ScreenView, navigationOptions, navigator, styles, ...rest } = props;
	const stylesheet = styles as ScreenStyles;

	// If there is no ScreenView, then is probably an instance where we are
	// given only a child navigator
	if (!ScreenView) {

		// Wrap the children in a View, this allows us to give this View a
		// screen height, and background color.
		return (<View {...rest} style={[stylesheet.root, stylesheet.root]} />);
	}

	// If navigationOptions is a thunk, resolve it
	const finalNavigationOptions = resolveThunk(
		navigationOptions || {},
		{
			navigation: props.navigation,
			screenProps: rest
		}
	);

	// if (navigator && navigator.type === 'stack') {
	return (
		<View style={stylesheet.root}>
			<Header {...finalNavigationOptions} />
			<View style={stylesheet.content}>
				<ScreenView {...rest} />
			</View>
		</View>
	);
	// }
};

Screen.defaultStyles = (theme: Theme) => ({
	content: {
		flex: 1,
	},
	root: {
		backgroundColor: theme.palette.background.default,
		flex: 1,
	}
});
