// import App1 from './apps/app1';
// import App2 from './apps/app2';
// import App3 from './apps/app3';
// import App4 from './apps/app4';
// import App5 from './apps/app5';
import { BootOptions } from '@bluebase/core';
import MaterialUI from '@bluebase/plugin-material-ui';
import deepmerge from 'deepmerge';

import commonBootOptions from '../common/bluebase';
import DemoApp from './apps/plugin-settings-app';

/**
 * Add your platform specific configs here.
 * We keep all the universal (cross platform) configs in
 * the common folder, and extend them here.
 */
const bootOptions: Partial<BootOptions> = {
	plugins: [MaterialUI, DemoApp],
};

export default deepmerge(commonBootOptions, bootOptions);
