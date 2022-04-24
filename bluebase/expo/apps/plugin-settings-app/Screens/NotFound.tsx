import { H1, View } from '@bluebase/components';
import React from 'react';

export class NotFoundScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<H1>404</H1>
			</View>
		);
	}
}
