import { BootOptions } from '@bluebase/core';
import MaterialUI from '@bluebase/plugin-material-ui';
import commonBootOptions from '../common/bluebase';
import deepmerge from 'deepmerge';

// TODO: Only for evaluation, remove this
// import DummyPlugin from './sample';

/**
 * Add your platform specific configs here. 
 * We keep all the universal (cross platform) configs in 
 * the common folder, and extend them here.
 */
const bootOptions: Partial<BootOptions> = {

	plugins: [MaterialUI]
	// config: {

	// 	wallpaper: {
	// 		backgroundColor: 'white',
	// 		resizeMode: 'cover',
	// 		source: require('./../../assets/storybook/wallpaper.jpg'),
	// 	},
	// }
};

export default deepmerge(commonBootOptions, bootOptions);
