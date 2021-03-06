import { FIREBASE_API, FIREBASE_PROJECT_ID } from "@env";
import { Alert } from "react-native";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const FETCH_USER_DATA = "FETCH_USER_DATA";
export const SET_MONTHLY_BUDGET = "SET_MONTHLY_BUDGET";

export const EMAIL_CHANGE = "EMAIL_CHANGE";
export const PASSWORD_CHANGE = "PASSWORD_CHANGE";

export const LOADING = "LOADING";

export const signUp = (email, password) => {
	return async (dispatch) => {
		dispatch({ type: LOADING, payload: true });
		// post sign up date
		const response = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);

		if (!response.ok) {
			dispatch({ type: LOADING, payload: false });
			Alert.alert("Error!", "This email is already registered");
			throw new Error("Cannot create account");
		}

		Alert.alert(
			"Success",
			"You can now log in with your email and password!"
		);

		const responseData = await response.json();

		// add basic info to user that just sign up
		await fetch(
			`https://${FIREBASE_PROJECT_ID}.firebasedatabase.app/user/${responseData.localId}.json`,
			{
				method: "PATCH",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					basicInfo: {
						income: 0,
						expenses: 0,
						total: 0,
						monthlyBudget: 0,
						accounts: ["Cash", "Bank"],
					},
				}),
			}
		);

		// add basic accounts
		await fetch(
			`https://${FIREBASE_PROJECT_ID}.firebasedatabase.app/user/${responseData.localId}.json`,
			{
				method: "PATCH",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					transactions_in_categories: {
						Cash: {
							income: 0,
							expenses: 0,
						},
						Bank: {
							income: 0,
							expenses: 0,
						},
					},
				}),
			}
		);
		
		dispatch({ type: SIGNUP, payload: responseData });
	};
};

export const logIn = (email, password) => {
	return async (dispatch) => {
		dispatch({ type: LOADING, payload: true });
		const response = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);

		if (!response.ok) {
			dispatch({ type: LOADING, payload: false });
			Alert.alert("Failed", "Incorrect email or password");
			throw new Error("Login Failed");
		}

		const responseData = await response.json();
		const response2 = await fetch(
			`https://${FIREBASE_PROJECT_ID}.firebasedatabase.app/user/${responseData.localId}.json`,
			{
				method: "GET",
			}
		);

		if (!response2.ok) {
			throw new Error("can't fetch user data"); // should not be failed
		}

		const responseData2 = await response2.json();
		dispatch({
			type: LOGIN,
			payload: responseData,
			userData: responseData2,
		});
	};
};

export const logOut = () => {
	Alert.alert("Success", "Log out successfully");
	return { type: LOGOUT };
};

export const fetchUserData = (uid) => {
	return async (dispatch) => {
		const response = await fetch(
			`https://${FIREBASE_PROJECT_ID}.firebasedatabase.app/user/${uid}.json`,
			{
				method: "GET",
			}
		);

		if (!response.ok) {
			throw new Error("can't fetch user data");
		}

		const responseData = await response.json();
		dispatch({ type: FETCH_USER_DATA, payload: responseData });
	};
};

export const setMonthlyBudget = (budget, uid) => {
	return async (dispatch) => {
		const response = await fetch(
			`https://${FIREBASE_PROJECT_ID}.firebasedatabase.app/user/${uid}/basicInfo.json`,
			{
				method: "PATCH",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					monthlyBudget: parseFloat(budget),
				}),
			}
		);

		if (!response.ok) {
			throw new Error("cannot set monthly budget");
		}
		const response2 = await fetch(
			`https://${FIREBASE_PROJECT_ID}.firebasedatabase.app/user/${uid}.json`,
			{
				method: "GET",
			}
		);

		if (!response2.ok) {
			throw new Error("can't fetch user data");
		}

		const responseData2 = await response2.json();
		dispatch({ type: SET_MONTHLY_BUDGET, payload: responseData2 });
	};
};

export const emailChange = (email) => {
	return { type: EMAIL_CHANGE, email: email };
};

export const passwordChange = (password) => {
	return { type: PASSWORD_CHANGE, password: password };
};
