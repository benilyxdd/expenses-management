import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, Button } from "react-native-paper";

import {
	emailChange,
	passwordChange,
	logIn,
	signUp,
} from "../store/actions/Auth.js";

const AuthScreen = (props) => {
	const userEmail = useSelector((state) => state.Auth.userEmail);
	const userPassword = useSelector((state) => state.Auth.userPassword);

	const dispatch = useDispatch();

	const logInHandler = () => {
		dispatch(logIn(userEmail, userPassword));
	};

	const signUpHandler = () => {
		dispatch(signUp(userEmail, userPassword));
	};

	return (
		<View style={styles.screen}>
			<Text style={styles.text}>Log In</Text>
			<View style={styles.inputContainer}>
				<TextInput
					label="email"
					value={userEmail}
					onChangeText={(email) => dispatch(emailChange(email))}
					autoCapitalize="none"
					autoCorrect={false}
					autoFocus={true}
				/>
				<TextInput
					label="password"
					value={userPassword}
					onChangeText={(password) =>
						dispatch(passwordChange(password))
					}
					autoCapitalize="none"
					autoCorrect={false}
					secureTextEntry={true}
				/>
			</View>
			<View style={styles.submitButtonContainer}>
				<Button onPress={signUpHandler}>Sign Up</Button>
				<Button onPress={logInHandler}>Log In</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontFamily: "Caveat-Bold",
		fontSize: 35,
	},
	inputContainer: {
		width: "80%",
		borderColor: "black",
		borderRadius: 20,
		borderWidth: 2,
		overflow: "hidden",
		marginTop: "5%",
	},
	submitButtonContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		margin: "5%",
	},
});

export default AuthScreen;
