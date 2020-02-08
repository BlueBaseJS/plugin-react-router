import { useBlueBase, useIntl, useTheme } from '@bluebase/core';

import { ScreenProps } from '../types';

export const useScreenProps = (): ScreenProps => {
	const BB = useBlueBase();
	const themes = useTheme();
	const intl = useIntl();

	return { BB, intl, themes, theme: themes.theme };
};
