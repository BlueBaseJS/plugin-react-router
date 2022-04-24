// tslint:disable:no-console
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';
import React from 'react';

const HeaderTitle = getComponent('HeaderTitle');

storiesOf('HeaderTitle', module)

	.add('Basic Example', () => (
		<HeaderTitle>A very long heading title sentence.</HeaderTitle>
	));
