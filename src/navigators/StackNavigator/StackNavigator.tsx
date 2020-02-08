import { BaseNavigator } from '../BaseNavigator';
import { getComponent } from '@bluebase/core';

const ScreenView = getComponent('ScreenView');

/**
 * Provides a way for your app to transition between screens where each new
 * screen is placed on top of a stack.
 */
export class StackNavigator extends BaseNavigator {

	static defaultProps = {
		RouteView: ScreenView
	};
}