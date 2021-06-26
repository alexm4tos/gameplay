import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		bottom: 0,
		height: 170,
		width: '100%',
		position: 'absolute',
	},
	overlay: {
		backgroundColor: theme.colors.overlay,
		flex: 1,
	},
	text: {
		fontFamily: theme.fonts.title700,
		fontSize: 20,
		color: theme.colors.heading,
		marginTop: 27,
	},
	textAlt: {
		color: theme.colors.primary,
	},
	content: {
		flex: 1,
		alignItems: 'center',
		width: '100%',
	},
	buttons: {
		flex: 1,
		marginTop: 27,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 24,
	},
	buttonYes: {
		width: '48%',
		height: 56,
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: theme.colors.primary,
	},
	buttonNo: {
		width: '48%',
		height: 56,
		borderWidth: 1,
		borderColor: theme.colors.secondary30,
		borderRadius: 8,
		alignItems: 'center',
		flexDirection: 'row',
	},
	title: {
		flex: 1,
		color: theme.colors.heading,
		fontFamily: theme.fonts.text500,
		fontSize: 15,
		textAlign: 'center',
	},
});