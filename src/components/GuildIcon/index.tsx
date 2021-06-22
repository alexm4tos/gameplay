import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';

export function GuildIcon() {
	const uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwd71z75EGWsCRoPRCZWLk8DPpSOzvUxSkz2teP1sWa_0hvYKNT6Q9eb4dmsJUABbyAJI&usqp=CAU';

	return (
		<Image 
			source={{ uri }}
			style={ styles.image }
			resizeMode="cover"
		/>
	)
}