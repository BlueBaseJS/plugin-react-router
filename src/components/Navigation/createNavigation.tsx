import React from 'react';

import { Navigation, RRNavigationProps } from './Navigation';

export const createNavigation = (Router: any) => (props: RRNavigationProps) => {
	return <Navigation {...props} Router={Router} />;
};
