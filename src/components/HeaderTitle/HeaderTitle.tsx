import { HeaderTitleProps, Text } from '@bluebase/components';
import { Theme } from '@bluebase/core';
import React from 'react';

const HeaderTitle: React.FunctionComponent<HeaderTitleProps> = ({
	style,
	styles,
	...rest
}: HeaderTitleProps) => (
	<Text
		testID="header-title"
		numberOfLines={1}
		{...rest}
		style={[styles && styles.root, style]}
		// accessibilityTraits="header"
	/>
);

(HeaderTitle as any).defaultStyles = (theme: Theme) => ({
	root: {
		...theme.typography.h6,
		// color: theme.palette.primary.contrastText,
		// fontSize: Platform.OS === 'ios' ? 17 : 20,
		// fontWeight: Platform.OS === 'ios' ? '600' : '500',
		// marginHorizontal: theme.spacing.unit * 2,
	},
});

export { HeaderTitle };
