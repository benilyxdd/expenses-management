import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { List, Divider } from "react-native-paper";

import HeaderText from "../../components/HeaderText";
import TouchableListItem from "../../components/TouchableListItem";

const SettingScreen = () => {
	return (
		<View style={styles.screen}>
			<HeaderText title="Settings" />
			<ScrollView style={styles.test}>
				<List.Section style={styles.listSection}>
					<List.Subheader>Transactions</List.Subheader>
					<Divider />
					<TouchableListItem title="Recurring Transaction" onPress = {() => console.log('hi')}/>
					<TouchableListItem title="hello" onPress = {() => console.log('hi')}/>
					<TouchableListItem title="hello" onPress = {() => console.log('hi')}/>
					<TouchableListItem title="hello" onPress = {() => console.log('hi')}/>
					<TouchableListItem title="hello" onPress = {() => console.log('hi')}/>
				</List.Section>
				<List.Section style={styles.listSection}>
					<List.Subheader>Settings</List.Subheader>
					<Divider />
					<TouchableListItem title="Theme" onPress = {() => console.log('hi')}/>
					<TouchableListItem title="hello" onPress = {() => console.log('hi')}/>
					<TouchableListItem title="hello" onPress = {() => console.log('hi')}/>
					<TouchableListItem title="hello" onPress = {() => console.log('hi')}/>
					<TouchableListItem title="hello" onPress = {() => console.log('hi')}/>
				</List.Section>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	test: {
		// backgroundColor: 'blue'
	},
	listSection: {
		// backgroundColor: "blue",
	},
});

export default SettingScreen;
