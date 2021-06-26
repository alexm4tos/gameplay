import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { useAuth } from '../../hooks/auth';

import { Avatar } from '../Avatar';
import { LogoutModal } from '../LogoutModal';

import { styles } from './styles';

export function Profile() {
	const { user, signOut } = useAuth();
	const [openSignOutModal, setOpenSignOutModal] = useState(false);

	function handleOpenSignOutModal() {
		setOpenSignOutModal(true);
	}

	function handleCloseSignOutModal() {
		setOpenSignOutModal(false);
	}

	function handleSignOut() {
		signOut();
	}

	return (
		<View style={ styles.container }>
			<RectButton onPress={handleOpenSignOutModal}>
				<Avatar urlImage={user.avatar} />
			</RectButton>
			
			<View>
				<View style={ styles.user }>
					<Text style={ styles.greeting }>
						Olá, 
					</Text>

					<Text style={ styles.username }>
						{ user.firstName }
					</Text>
				</View>

				<Text style={ styles.message }>
					Hoje é dia de vitória
				</Text>
			</View>

			<LogoutModal
				visible={openSignOutModal}
				handleButtonNo={handleCloseSignOutModal}
				handleButtonYes={handleSignOut}
			/>
		</View>
	);
}