/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/typedef */
import { HeaderBackButtonProps, TouchableItem } from '@bluebase/components';
import { Theme, useIntl, useNavigation, useStyles } from '@bluebase/core';
import React, { useCallback, useState } from 'react';
import { Image, Platform, Text, View } from 'react-native';

// import defaultBackImage from '../assets/back-icon.png';
// tslint:disable-next-line: no-var-requires
const defaultBackImage = require('../../../assets/common/back-icon.png');

const defaultStyles = (rtl: boolean) => (theme: Theme) => {
	const iconIosStyles = {
		backgroundColor: 'transparent',
		height: 21,
		marginLeft: 9,
		marginRight: 22,
		marginVertical: 12,
		resizeMode: 'contain',
		transform: [{ scaleX: rtl ? -1 : 1 }],
		width: 13,
	};

	const iconDefaultStyles = {
		backgroundColor: 'transparent',
		height: 24,
		margin: 3,
		resizeMode: 'contain',
		transform: [{ scaleX: rtl ? -1 : 1 }],
		width: 24,
	};

	return {
		androidButtonWrapper: {
			backgroundColor: 'transparent',
			margin: 13,
		},
		icon: Platform.OS === 'ios' ? iconIosStyles : iconDefaultStyles,
		iconWithTitle: Platform.OS === 'ios' ? { marginRight: 6 } : {},
		title: {
			// color: theme.palette.primary.contrastText,// || Platform.select({ ios: '#037aff' })
			color: theme.palette.text.secondary, // || Platform.select({ ios: '#037aff' })
			fontSize: 17,
			paddingRight: 10,
		},
		wrapper: {
			alignItems: 'center',
			backgroundColor: 'transparent',
			flexDirection: 'row',
		},
	};
};

export const HeaderBackButton = (props: HeaderBackButtonProps) => {
	const {
		style,
		onPress,
		pressColorAndroid,
		title,
		backImage,
		backTitleVisible,
		tintColor,
		width,
		truncatedTitle,
		allowFontScaling,
		titleStyle
	} = props;

	const { rtl } = useIntl();
	const { goBack } = useNavigation();

	const styles = useStyles('HeaderBackButton', props, defaultStyles(rtl));
	const [initialTextWidth, setInitialTextWidth] = useState();

	const onTextLayout = useCallback((e: any) => {
		if (initialTextWidth) {
			return;
		}

		setInitialTextWidth(e.nativeEvent.layout.x + e.nativeEvent.layout.width);
	}, [initialTextWidth]);

	const renderBackImage = () => {
		if (React.isValidElement(backImage)) {
			return backImage;
		}

		const finalTintColor = tintColor || styles.title.color;

		const stylesheet = [
			styles.icon,
			!!backTitleVisible && styles.iconWithTitle,
			!!finalTintColor && { tintColor: finalTintColor },
		];

		return <Image source={defaultBackImage} style={stylesheet as any} fadeDuration={0} />;
	};

	const getTitleText = () => {
		if (title === null) {
			return null;
		} else if (!title) {
			return truncatedTitle;
		} else if (initialTextWidth && width && initialTextWidth! > width) {
			return truncatedTitle;
		} else {
			return title;
		}
	};

	const maybeRenderTitle = () => {
		const backTitleText = getTitleText();

		if (!backTitleVisible || backTitleText === null) {
			return null;
		}

		return (
			<Text
				accessible={false}
				onLayout={onTextLayout}
				style={[styles.title, !!tintColor && { color: tintColor }, titleStyle]}
				numberOfLines={1}
				allowFontScaling={!!allowFontScaling}
				testID="header-back-title"
			>
				{getTitleText()}
			</Text>
		);
	};

	// const wrapperStyles = [styles.wrapper];

	// if (style && Array.isArray(style)) {
	// 	wrapperStyles = [...wrapperStyles, ...style];
	// } else if (!!style) {
	// 	wrapperStyles.push(style);
	// }

	const button = (
		<TouchableItem
			accessible
			accessibilityRole="button"
			// accessibilityComponentType="button"
			accessibilityLabel={title ? `${title}, back` : 'Go back'}
			// accessibilityTraits="button"
			testID="header-back"
			delayPressIn={0}
			onPress={onPress || goBack}
			pressColor={pressColorAndroid}
			borderless
			style={style}
		>
			<View testID="header-back-wrapper" style={styles.wrapper as any}>
				{renderBackImage()}
				{maybeRenderTitle()}
			</View>
		</TouchableItem>
	);

	if (Platform.OS === 'android') {
		return (
			<View testID="header-android-wrapper" style={styles.androidButtonWrapper}>
				{button}
			</View>
		);
	} else {
		return button;
	}
};

HeaderBackButton.displayName = 'HeaderBackButton';
