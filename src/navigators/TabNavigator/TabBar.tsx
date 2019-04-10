import { BottomNavigation, BottomNavigationAction, Tab, Tabs } from '@bluebase/components';
import React from 'react';
import { RouteConfigWithResolveSubRoutes } from '../../types';
import { TabViewProps } from './TabView';
import { resolveThunk } from '@bluebase/core';

export interface TabBarProps extends TabViewProps {

	/**
	 * If true, renders BottomNavigation instead of Tabs
	 */
	bottomNavigation: boolean;
}

export class TabBar extends React.Component<TabBarProps> {

	render() {

		const { bottomNavigation, navigation, navigator } = this.props;
		const { routes } = navigator;

		// Resolve active tab index
		const currentRouteName = navigation.state.routeName;
		const currentIndex = navigator.routes.findIndex(route => route.name === currentRouteName);

		const onChange = (_e: any, i: number) => navigation.push(routes[i].name);

		const Component = bottomNavigation === true ? BottomNavigation : Tabs;

		return (
			<Component value={currentIndex} onChange={onChange}>
				{navigator.routes.map((route, index) => this.renderTab(route, index, this.props))}
			</Component>
		);
	}

	private renderTab(route: RouteConfigWithResolveSubRoutes, index: number, props: TabBarProps) {

		const { bottomNavigation, ...rest } = props;

		const Component = bottomNavigation === true ? BottomNavigationAction : Tab;

		// Resolve navigationOptions
		const options = resolveThunk(
			route.navigationOptions || {},
			{
				navigation: props.navigation,
				screenProps: rest
			}
		);

		return (
			<Component
				icon={route.icon}
				label={options.title}
				value={index as any}
				key={index}
			/>
		);
	}
}