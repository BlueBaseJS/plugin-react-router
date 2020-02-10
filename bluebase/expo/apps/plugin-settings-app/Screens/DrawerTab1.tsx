import { ComponentState, DrawerActions } from '@bluebase/components';

import React from 'react';

export class DrawerTab1Screen extends React.Component {
	render() {
		return (
			<DrawerActions>
				{({ toggleDrawer }: any) => (
					<ComponentState
						title="Drawer Page 1"
						actionOnPress={toggleDrawer}
						actionTitle="Toggle Drawer"
						styles={{ root: { backgroundColor: 'rgba(255,0,0,.1)' } }}
					/>
				)}
			</DrawerActions>
		);
	}
}
