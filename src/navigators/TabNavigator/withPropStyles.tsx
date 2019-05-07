import { Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { ThemeConsumer } from '@bluebase/core';

const { createElement, forwardRef } = React;

// Docs: https://github.com/mui-org/material-ui/issues/7633#issuecomment-418211698
export const withPropStyles = (style: any) => {

	const withPropsStylesInternal = (component: React.ComponentType<any>) => {

		return forwardRef((props, ref) => (
			<ThemeConsumer>
				{({ theme: bluebaseTheme }) => {

					const proxy = (theme: Theme) => style(props, theme, bluebaseTheme);

					const hoc = withStyles(proxy)(component);

					return createElement(hoc, { ...props, ref }, props.children);
				}}
			</ThemeConsumer>
		));
	};

	return withPropsStylesInternal;
};
