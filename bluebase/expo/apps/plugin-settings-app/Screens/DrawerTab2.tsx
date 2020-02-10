import { ComponentState, DrawerActions } from '@bluebase/components';

import React from 'react';

export class DrawerTab2Screen extends React.Component {
	render() {
		return (
			<DrawerActions>
				{({ toggleDrawer }: any) => (
					<ComponentState
						title="Drawer Page 2"
						actionOnPress={toggleDrawer}
						actionTitle="Toggle Drawer"
						styles={{ root: { backgroundColor: 'rgba(0,255,0,.1)' } }}
					/>
				)}
			</DrawerActions>
		);
	}
}
