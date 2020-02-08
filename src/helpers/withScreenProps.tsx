import {
	BlueBase,
	BlueBaseConsumer,
	IntlConsumer,
	IntlContextData,
	Theme,
	ThemeConsumer,
} from '@bluebase/core';
import React from 'react';

export interface ScreenProps {
	BB: BlueBase,
	theme: Theme,
	intl: IntlContextData
}

export function withScreenProps<T = any>(Component: React.ComponentType<T>):
React.ComponentType<T> {

	return (props: T) => (
		<BlueBaseConsumer>
		{(BB: BlueBase) => (
			<ThemeConsumer>
			{({ theme }) => (
				<IntlConsumer>
				{(intl) => (
					<Component  {...props} screenProps={{ BB, theme, intl }} />
				)}
				</IntlConsumer>
			)}
			</ThemeConsumer>
		)}
		</BlueBaseConsumer>
	);
}