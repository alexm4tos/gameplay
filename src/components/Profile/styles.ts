import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	user: {
		flexDirection: 'row',
	},
	greeting: {
		fontFamily: theme.fonts.title500,
		fontSize: 24,
		color: theme.colors.heading,
		marginRight: 6,
	},
	username: {
		fontFamily: theme.fonts.title700,
		fontSize: 24,
		color: theme.colors.heading,
	},
	message: {
		fontFamily: theme.fonts.text400,
		color: theme.colors.highlight,
	},
	overlay: {
		backgroundColor: theme.colors.overlay,
		flex: 1,
	},
	containerModal: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'red',
		position: 'absolute',
	},
});