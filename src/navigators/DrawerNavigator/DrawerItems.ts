import { NavigationActionsObject, RouteConfig } from '@bluebase/components';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface DrawerItemsProps {
	navigation: NavigationActionsObject;
	items: RouteConfig[];
	activeItemKey?: string;
	activeTintColor?: string;
	activeBackgroundColor?: string;
	inactiveTintColor?: string;
	inactiveBackgroundColor?: string;
	getLabel: (scene: DrawerScene) => React.ReactNode | string;
	renderIcon: (scene: DrawerScene) => React.ReactNode;
	onItemPress: (info: DrawerItem) => void;
	itemsContainerStyle?: StyleProp<ViewStyle>;
	itemStyle?: StyleProp<ViewStyle>;
	labelStyle?: StyleProp<TextStyle>;
	activeLabelStyle?: StyleProp<TextStyle>;
	inactiveLabelStyle?: StyleProp<TextStyle>;
	iconContainerStyle?: StyleProp<ViewStyle>;
	drawerPosition: 'left' | 'right';
}
export interface DrawerScene {
	route: RouteConfig;
	focused: boolean;
	index: number;
	tintColor?: string;
}
export interface DrawerItem {
	route: RouteConfig;
	focused: boolean;
}
