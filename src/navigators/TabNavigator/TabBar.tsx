import { BottomNavigation, BottomNavigationAction, NavigationOptions, Tab, Tabs } from '@bluebase/components';
import React from 'react';
import { RouteConfigWithResolveSubRoutes } from '../../types';
import { TabViewProps } from './TabView';
import { getIcon, getTitle } from './helpers';

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

		const onChange = (_e: any, i: number) => navigation.push(routes[i].name, navigation.state.params);

		const Component : any = bottomNavigation === true ? BottomNavigation : Tabs;

		return (
			<Component value={currentIndex} onChange={onChange} style={{ zIndex: 1100 }}>
				{navigator.routes.map((route, index) => this.renderTab(route, index, this.props))}
			</Component>
		);
	}

	private renderTab(route: RouteConfigWithResolveSubRoutes, index: number, props: TabBarProps) {

		const { bottomNavigation } = props;

		const Component: any = bottomNavigation === true ? BottomNavigationAction : Tab;

		const options = route.navigationOptions as NavigationOptions;
		const icon = getIcon(options);
		const title = getTitle(options);

		return (
			<Component
				icon={icon}
				label={title}
				value={index as any}
				key={index}
			/>
		);
	}
}