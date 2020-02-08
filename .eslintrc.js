const configs = require('@bluebase/code-standards/.eslintrc');

module.exports = {
	...configs,
	env: {
		...configs.env,
		jest: true,
	},
};
