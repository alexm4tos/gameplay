import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = TextInputProps & {
	hasError?: boolean | null;
}

export function TextArea({ hasError, ...rest }: Props) {
	return (
		<TextInput
			style={[styles.container, { borderColor: hasError ? theme.colors.primary : theme.colors.secondary50 }]}
			{ ...rest }
		/>
	)
}
