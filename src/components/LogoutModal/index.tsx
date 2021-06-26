import React from 'react';
import { 
	View, 
	Modal, 
	Text, 
	ModalProps, 
	TouchableOpacity, 
	TouchableWithoutFeedback
} from 'react-native';

import { Background } from '../Background';

import { styles } from './styles';

type Props = ModalProps & {
	handleButtonNo: () => void;
	handleButtonYes: () => void;
}

export function LogoutModal({ 
	handleButtonNo, 
	handleButtonYes,
	...rest
}: Props) {
	return(
		<Modal
			animationType="fade"
			transparent
			statusBarTranslucent
			{ ...rest }
		>
			<TouchableWithoutFeedback onPress={handleButtonNo}>
				<View style={styles.overlay}>
					<View style={styles.container}>
						<Background>
							<View style={styles.content}>
								<Text style={styles.text}>
									Deseja sair do Game
									<Text style={styles.textAlt}>
										Play
									</Text>
									?
								</Text>

								<View style={styles.buttons}>
									<TouchableOpacity 
										onPress={handleButtonNo}
										style={styles.buttonNo}
									>
										<Text style={styles.title}>
											Não
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={handleButtonYes}
										style={styles.buttonYes}
									>
										<Text style={styles.title}>
											Sim
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Background>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
}