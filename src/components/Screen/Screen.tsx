import {
	Header,
	NavigationActionsObject,
	NavigationOptions,
	View,
} from '@bluebase/components';
import {
	MaybeThunk,
	Theme,
	resolveThunk,
} from '@bluebase/core';
import { StyleProp, ViewStyle } from 'react-native';
import { NavigatorPropsWithResolvedRoutes } from '../../types';
import React from 'react';

export interface ScreenStyles {
	root: StyleProp<ViewStyle>
}

export interface ScreenProps {
	navigationOptions?: MaybeThunk<NavigationOptions>,
	component?: React.ComponentType<any>,
	navigation: NavigationActionsObject,
	navigator: NavigatorPropsWithResolvedRoutes,
	children: React.ReactNode,
	styles?: ScreenStyles
}

const ScreenContent = ({ children }: any) => (
	<View style={{ flex: 1 }}>{children}</View>
);

export const Screen = (props: ScreenProps) => {

	const { component, navigationOptions, navigator, styles, ...rest } = props;
	const stylesheet = styles as ScreenStyles;

	const Component = component || ScreenContent;

	const finalNavigationOptions = resolveThunk(
		navigationOptions || {},
		{
			navigation: props.navigation,
			screenProps: rest
		}
	);

	if (navigator && navigator.type === 'stack') {
		return (
			<View style={stylesheet.root}>
				<Header {...finalNavigationOptions} />
				<Component {...rest} />
			</View>
		);
	}

	return (<Component {...rest} />);
};

Screen.defaultStyles = (theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		flex: 1,
	}
});
