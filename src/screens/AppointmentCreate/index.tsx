import React, { useState } from 'react';
import { 
	View, 
	Text, 
	ScrollView, 
	Platform,
	KeyboardAvoidingView,
	Alert,

} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

import { Feather } from '@expo/vector-icons';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

import { CategorySelect } from '../../components/CategorySelect';
import { SmallInput } from '../../components/SmallInput';
import { Background } from '../../components/Background';
import { GuildIcon } from '../../components/GuildIcon';
import { ModalView } from '../../components/ModalView';
import { TextArea } from '../../components/TextArea';
import { GuildProps } from '../../components/Guild';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Guilds } from '../Guilds';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import { COLLECTION_APPOINTMENTS } from '../../configs/storage';

export function AppointmentCreate() {
	const [openGuildsModal, setOpenGuildsModal] = useState(false);
	const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
	
	const [category, setCategory] = useState('');
	const [day, setDay] = useState('');
	const [month, setMonth] = useState('');
	const [hour, setHour] = useState('');
	const [minute, setMinute] = useState('');
	const [description, setDescription] = useState('');

	const [errorGuild, setErrorGuild] = useState(false);
	const [errorCategory, setErrorCategory] = useState(false);
	const [errorDay, setErrorDay] = useState(false);
	const [errorMonth, setErrorMonth] = useState(false);
	const [errorHour, setErrorHour] = useState(false);
	const [errorMinute, setErrorMinute] = useState(false);
	const [errorDescription, setErrorDescription] = useState(false);

	const countErrors = 0;

	const navigation = useNavigation();

	function handleOpenGuilds() {
		setOpenGuildsModal(true);
	}
	
	function handleCloseGuilds() {
		setOpenGuildsModal(false);
		if (typeof guild.id !== 'undefined') setErrorGuild(false);
	}

	function handleGuildSelect(guildSelected: GuildProps) {
		setGuild(guildSelected);
		setOpenGuildsModal(false);
	}

	function handleCategorySelect(categoryId: string) {
		setCategory(categoryId);
	}

	function showMessageInvalid($text: string) {
		showMessage({
			message: "Ops..",
			description: `${$text} deve ser preenchido com um valor válido.`,
			type: "danger",
			position: "bottom",
		});
	}

	function showMessageMissing($text: string, $limitMin = 1, $limitMax = 31) {
		showMessage({
			message: "Ops..",
			description: `${$text} deve ser preenchido com valores entre ${$limitMin} e ${$limitMax}.`,
			type: "danger",
			position: "bottom",
		});
	}

	function validateDay() {
		let e = false;

		if (isNaN(Number(day)) || Number.parseInt(day) < 1 || Number.parseInt(day) > 31) {
			showMessageMissing('O dia', 1, 31);
			setErrorDay(true);
			e = true;
		} else if (day.length == 0) {
			showMessageInvalid('O dia');
			setErrorDay(true);
			e = true;
		} else {
			setErrorDay(false);
		}

		return e;
	}

	function validateMonth() {
		let e = false;

		if (isNaN(Number(month)) || Number.parseInt(month) < 1 || Number.parseInt(month) > 12) {
			showMessageInvalid('O mês');
			setErrorMonth(true);
			e = true;
		} else if (month.length == 0) {
			showMessageMissing('O mês', 1, 12);
			setErrorMonth(true);
			e = true;
		} else {
			setErrorMonth(false);
		}

		return e;
	}

	function validateHour() {
		let e = false;
		
		if (isNaN(Number(hour)) || Number.parseInt(hour) < 0 || Number.parseInt(hour) > 23) {
			showMessageInvalid('A hora');
			setErrorHour(true);
			e = true;
		} else if (hour.length == 0) {
			showMessageMissing('A hora', 0, 23);
			setErrorHour(true);
			e = true;
		} else {
			setErrorHour(false);
		}
		return e;
	}

	function validateMinute() {
		let e = false; 

		if (isNaN(Number(minute)) || Number.parseInt(minute) < 1 || Number.parseInt(minute) > 59) {
			showMessageInvalid('O minuto');
			setErrorMinute(true);
			e = true;
		} else if (minute.length == 0) {
			showMessageMissing('O minuto', 0, 59);
			setErrorMinute(true);
			e = true;
		} else {
			setErrorMinute(false);
		}

		return e;
	}

	function validateDescription() {
		let e = false;

		if (description.length == 0) {
			showMessageInvalid('A descrição');
			setErrorDescription(true);
			e = true;
		} else {
			setErrorDescription(false);
		}

		return e;
	}

	function validateCategory() {
		let e = false;

		if (category.length == 0) {
			showMessageInvalid('A categoria');
			setErrorCategory(true);
			e = true;
		} else {
			setErrorCategory(false);
		}

		return e;
	}

	function validateGuild() {
		let e = false;

		if (typeof guild.id == 'undefined') {
			showMessageInvalid('O servidor');
			setErrorGuild(true);
			e = true;
		} else {
			setErrorGuild(false);
		}

		return e;
	}

	function validate() : boolean {
		let e = false,
			i = 0;
			
			if (validateDescription()) i++;
			if (validateMinute()) i++;
			if (validateHour()) i++;
			if (validateMonth()) i++;
			if (validateDay()) i++;
			if (validateGuild()) i++;
		if (validateCategory()) i++;

		if (i > 0) return false;

		return !e;
	}

	async function handleSave() {
		if (validate()) {
			const newAppointment = {
				id: uuid.v4(),
				guild,
				category,
				date: `${day}/${month} às ${hour}:${minute}h`,
				description,
			}

			const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
			const appointments = storage ? JSON.parse(storage) : [];

			await AsyncStorage.setItem(
				COLLECTION_APPOINTMENTS, 
				JSON.stringify([...appointments, newAppointment])
			);
			
			navigation.navigate('Home');
		}
	}

	return (
		<KeyboardAvoidingView 
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<Background>
				<ScrollView>
					<Header
						title="Agendar partida"
					/>

					<Text style={[
						styles.label, 
						{ marginLeft: 24, marginTop: 36, marginBottom: 18, }]}
					>
						Categoria
					</Text>

					<CategorySelect
						hasCheckBox
						setCategory={handleCategorySelect}
						categorySelected={category}
						hasError={errorCategory}
					/>

					<View style={ styles.form }>
						<RectButton onPress={handleOpenGuilds}>
							<View style={[styles.select, { borderColor: errorGuild ? theme.colors.primary : theme.colors.secondary50 } ]}>
								{
									guild.icon
									? <GuildIcon
										guildId={guild.id}
										iconId={guild.icon}
									/>
									: <View style={ styles.image } />
								}
								<View style={ styles.selectBody } >
									<Text style={styles.label}>
										{
											guild.name 
											? guild.name 
											: 'Selecione um servidor'
										}
									</Text>
								</View>

								<Feather
									name="chevron-right"
									color={theme.colors.heading}
									size={18}
								/>
							</View>
						</RectButton>
								
						<View style={ styles.field }>
							<View>
								<Text style={[styles.label, { marginBottom: 12 }]}>
									Dia e mês
								</Text>

								<View style={ styles.column }>
									<SmallInput
										maxLength={2}
										onChangeText={setDay}
										hasError={errorDay}
										onBlur={validate}
									/>
									<Text style={ styles.divider }>
										/
									</Text>
									<SmallInput
										maxLength={2}
										onChangeText={setMonth}
										hasError={errorMonth}
										onBlur={validate}
									/>
								</View>
							</View>

							<View>
								<Text style={[styles.label, { marginBottom: 12 } ]}>
									Hora e minuto
								</Text>

								<View style={styles.column}>
									<SmallInput
										maxLength={2}
										onChangeText={setHour}
										hasError={errorHour}
										onBlur={validate}
									/>
									<Text style={styles.divider}>
										:
									</Text>
									<SmallInput
										maxLength={2}
										onChangeText={setMinute}
										hasError={errorMinute}
										onBlur={validate}
									/>
								</View>
							</View>
						</View>

						<View style={[styles.field, { marginBottom: 12 }]}>
							<Text style={styles.label}>
								Descrição
							</Text>

							<Text style={styles.caracteresLimit}>
								{description.length > 0 ? `${description.length}/100` : 'Max 100 caracteres'}
							</Text>
						</View>

						<TextArea
							multiline
							maxLength={100}
							numberOfLines={5}
							autoCorrect={false}
							onChangeText={setDescription}
							hasError={errorDescription}
							onBlur={validate}
						/>

						<View style={styles.footer}>
							<Button 
								title="Agendar"
								onPress={handleSave}
							/>
						</View>
					</View>
				</ScrollView>
			</Background>

			<ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
				<Guilds handleGuildSelect={handleGuildSelect} />
			</ModalView>

			<FlashMessage position="top" statusBarHeight={getStatusBarHeight()} />
		</KeyboardAvoidingView>
	);
}
