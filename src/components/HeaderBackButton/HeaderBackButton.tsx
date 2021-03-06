/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/typedef */
import {
	HeaderBackButtonProps,
	HeaderBackButtonStyles,
	NavigationActions,
	NavigationActionsObject,
	TouchableItem,
} from '@bluebase/components';
import { I18nManager, Image, Platform, Text, View } from 'react-native';

import React from 'react';
import { Theme } from '@bluebase/core';

// import defaultBackImage from '../assets/back-icon.png';
// tslint:disable-next-line: no-var-requires
const defaultBackImage = require('../../../assets/common/back-icon.png');

export interface HeaderBackButtonState {
	initialTextWidth?: number;
}

class HeaderBackButton extends React.PureComponent<HeaderBackButtonProps, HeaderBackButtonState> {
	static defaultProps = {
		defaultStyles: {},
		pressColorAndroid: 'rgba(0, 0, 0, .32)',
		truncatedTitle: 'Back',
	};

	state: HeaderBackButtonState = {};

	static defaultStyles = (theme: Theme) => {
		const iconIosStyles = {
			backgroundColor: 'transparent',
			height: 21,
			marginLeft: 9,
			marginRight: 22,
			marginVertical: 12,
			resizeMode: 'contain',
			transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
			width: 13,
		};

		const iconDefaultStyles = {
			backgroundColor: 'transparent',
			height: 24,
			margin: 3,
			resizeMode: 'contain',
			transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
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

	_onTextLayout = (e: any) => {
		if (this.state.initialTextWidth) {
			return;
		}
		this.setState({
			initialTextWidth: e.nativeEvent.layout.x + e.nativeEvent.layout.width,
		});
	};

	_renderBackImage() {
		const { backImage, backTitleVisible } = this.props;
		const styles = this.props.styles as HeaderBackButtonStyles;

		if (React.isValidElement(backImage)) {
			return backImage;
		}

		const tintColor = this.props.tintColor || (styles.title as any).color;

		const stylesheet = [
			styles.icon,
			!!backTitleVisible && styles.iconWithTitle,
			!!tintColor && { tintColor },
		];

		return <Image source={defaultBackImage} style={stylesheet} fadeDuration={0} />;
	}

	_getTitleText = () => {
		const { width, title, truncatedTitle } = this.props;

		const { initialTextWidth } = this.state;

		if (title === null) {
			return null;
		} else if (!title) {
			return truncatedTitle;
		} else if (initialTextWidth && width && initialTextWidth > width) {
			return truncatedTitle;
		} else {
			return title;
		}
	};

	_maybeRenderTitle() {
		const { allowFontScaling, backTitleVisible, titleStyle, tintColor } = this.props;
		const styles = this.props.styles as HeaderBackButtonStyles;

		const backTitleText = this._getTitleText();

		if (!backTitleVisible || backTitleText === null) {
			return null;
		}

		return (
			<Text
				accessible={false}
				onLayout={this._onTextLayout}
				style={[styles.title, !!tintColor && { color: tintColor }, titleStyle]}
				numberOfLines={1}
				allowFontScaling={!!allowFontScaling}
				testID="header-back-title"
			>
				{this._getTitleText()}
			</Text>
		);
	}

	render() {
		const { style, onPress, pressColorAndroid, title } = this.props;

		const styles = this.props.styles as HeaderBackButtonStyles;

		// const wrapperStyles = [styles.wrapper];

		// if (style && Array.isArray(style)) {
		// 	wrapperStyles = [...wrapperStyles, ...style];
		// } else if (!!style) {
		// 	wrapperStyles.push(style);
		// }

		const button = (
			<NavigationActions
				children={({ goBack }: NavigationActionsObject) => (
					<TouchableItem
						accessible={true}
						accessibilityRole="button"
						accessibilityComponentType="button"
						accessibilityLabel={title ? `${title}, back` : 'Go back'}
						accessibilityTraits="button"
						testID="header-back"
						delayPressIn={0}
						onPress={onPress || goBack}
						pressColor={pressColorAndroid}
						borderless={true}
						style={style}
					>
						<View testID="header-back-wrapper" style={styles.wrapper}>
							{this._renderBackImage()}
							{this._maybeRenderTitle()}
						</View>
					</TouchableItem>
				)}
			/>
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
	}
}

export { HeaderBackButton };
