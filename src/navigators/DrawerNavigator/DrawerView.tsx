import {
	DrawerItem,
	DrawerLayout,
	DrawerSection,
	NavigationActions,
	NavigationActionsObject,
	NavigationOptions,
	View,
} from '@bluebase/components';
import { MaybeThunk, Theme } from '@bluebase/core';
import { SafeAreaView, ScrollView } from 'react-native';
import { getIcon, getTitle } from './helpers';

import { NavigatorPropsWithResolvedRoutes } from '../../types';
import React from 'react';
import { ScreenViewStyles } from '../StackNavigator';

export interface DrawerViewProps {
	navigationOptions?: MaybeThunk<NavigationOptions>;
	screen?: React.ComponentType<any>;
	navigation: NavigationActionsObject;
	navigator: NavigatorPropsWithResolvedRoutes;
	children: React.ReactNode;
	styles?: ScreenViewStyles;
}

// const DrawerLayout = getComponent('DrawerLayout');

const DrawerNavigationView = (props: any) => () => {
	const { navigationState } = props;
	const { routes } = navigationState;
	const { contentComponent: ContentComponent } = props.navigator;

	if (ContentComponent) {
		return <ContentComponent navigation={props.navigation} />;
	}

	return (
		<ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
			<SafeAreaView>
				<DrawerSection>
					<NavigationActions>
						{({ navigate, state }) =>
							routes.map((r: any) => {
								const title = getTitle(r.options);
								const icon = getIcon(r.options);

								return (
									<DrawerItem
										key={r.routeName}
										title={title}
										icon={icon}
										onPress={() => navigate(r.routeName, state.params)}
									/>
								);
							})
						}
					</NavigationActions>
				</DrawerSection>
			</SafeAreaView>
		</ScrollView>
	);
};

export const DrawerView = (props: DrawerViewProps) => {
	const { screen: Screen, navigationOptions, navigator, styles, ...rest } = props;
	const { contentOptions, routes, type, ...other } = navigator;

	const stylesheet = styles as ScreenViewStyles;

	// const Component = Screen; // || DrawerViewContent;

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
				options,
				path: route.path,
				routeName: route.name,
				// title: options.title,
			};
		}),
	};
	// debugger;

	return (
		<View style={stylesheet.root}>
			<DrawerLayout
				{...other}
				renderNavigationView={DrawerNavigationView({ ...props, navigationState })}
			>
				{Screen ? <Screen {...rest} /> : rest.children}
			</DrawerLayout>
		</View>
	);
};

DrawerView.defaultStyles = (theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		flex: 1,
	},
});
