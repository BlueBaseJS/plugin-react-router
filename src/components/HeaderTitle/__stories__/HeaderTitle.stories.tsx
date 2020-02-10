// tslint:disable:no-console
import React from 'react';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const HeaderTitle = getComponent('HeaderTitle');

storiesOf('HeaderTitle', module)

	.add('Basic Example', () => (
		<HeaderTitle>A very long heading title sentence.</HeaderTitle>
	));
