import { BaseNavigator } from '../BaseNavigator';
import { getComponent } from '@bluebase/core';

const DrawerView = getComponent('DrawerView');

/**
 */
export class DrawerNavigator extends BaseNavigator {

	static defaultProps = {
		RouteView: DrawerView
	};
}