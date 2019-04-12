import { BaseNavigator } from '../BaseNavigator';
import { getComponent } from '@bluebase/core';

const TabView = getComponent('TabView');

/**
 */
export class TabNavigator extends BaseNavigator {

	static defaultProps = {
		RouteView: TabView
	};
}