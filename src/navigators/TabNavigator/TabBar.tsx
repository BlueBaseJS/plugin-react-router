// tslint:disable: no-submodule-imports
import { NavigationActions, NavigationActionsObject } from '@bluebase/core';
import {
	Tab,
	TabBarProps,
	TabBarRoute,
	TabBarScene,
	Tabs,
} from '@bluebase/components';
import React from 'react';

// export interface TabBarState {
// 	value: number;
// }

export class TabBar extends React.Component<TabBarProps<TabBarRoute>> {

	static defaultProps: Partial<TabBarProps> = {

		getAccessibilityLabel: ({ route }: TabBarScene<TabBarRoute>) =>
		typeof route.accessibilityLabel === 'string'
			? route.accessibilityLabel
			: typeof route.title === 'string'
			? route.title
			: undefined,

		getAccessible: ({ route }: TabBarScene<TabBarRoute>) =>
      typeof route.accessible !== 'undefined' ? route.accessible : true,

		getLabelText: ({ route }: TabBarScene<TabBarRoute>) =>
				typeof route.title === 'string' ? route.title.toUpperCase() : route.title,

		getTestID: ({ route }: TabBarScene<TabBarRoute>) => route.testID,
		// renderIndicator: (props: IndicatorProps<TabBarRoute>) => (
    //   <TabBarIndicator {...props} />
    // ),
	};

	// readonly state: TabBarState = {
	// 	value: 0
	// };

	constructor(props: TabBarProps<TabBarRoute>) {
		super(props);

    // This binding is necessary to make `this` work in the callback
		this.renderTab = this.renderTab.bind(this);
	}

	render() {

		const { navigationState } = this.props;
		// const { value } = this.state;
		const { routes } = navigationState;

		const scenes = routes.map((route, index) => ({
			focused: false,
			index,
			route,
		}));

		return (
			<NavigationActions>
				{({ push }: NavigationActionsObject) => {

					const onChange = (_e: any, index: number) => {
						// this.setState({ value: index });
						push(routes[index].routeName);
					};

					return (
						<Tabs value={navigationState.index} onChange={onChange}>
							{scenes.map(this.renderTab)}
						</Tabs>
					);
				}}
			</NavigationActions>
		);

	}

	private renderTab(scene: TabBarScene<TabBarRoute>) {

		const { getLabelText, renderIcon, renderLabel } = this.props;

		const label = renderLabel
		? renderLabel(scene)
		: getLabelText ? getLabelText(scene) : undefined;

		return (
			<Tab
				icon={renderIcon ? renderIcon(scene) : null as any}
				label={label}
				value={String(scene.index)}
				key={scene.index}
			/>
		);
	}
}