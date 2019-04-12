import {
	Button,
	DrawerActions,
	H3,
	H6,
	View
} from '@bluebase/components';
import React from 'react';

export const DrawerPage1 = () => (
	<View style={{ flex: 1, alignItems: 'center' }}>
		<H3>Drawer</H3>
		<H6>Page 1</H6>
		<DrawerActions>
			{(navigation) => (
				<React.Fragment>
					<Button title="Open" onPress={navigation.openDrawer} />
					<Button title="Close" onPress={navigation.closeDrawer} />
					<Button title="Toggle" onPress={navigation.toggleDrawer} />
				</React.Fragment>
			)}
		</DrawerActions>
	</View>
);