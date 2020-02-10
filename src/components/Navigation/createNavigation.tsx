import { Navigation, RRNavigationProps } from './Navigation';

import React from 'react';

export const createNavigation = (Router: any) => (props: RRNavigationProps) => {
	return <Navigation {...props} Router={Router} />;
};
