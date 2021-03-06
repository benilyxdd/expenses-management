import { FIREBASE_PROJECT_ID } from "@env";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export const INPUT_CATEGORY_CHANGE = "INPUT_CATEGORY_CHANGE";
export const RESET_INPUT_CATEGORY = "RESET_INPUT_CATEGORY";

export const addCategory = (uid, originalCategories, newCategory) => {
	return async (dispatch) => {
		// send data to database
		const response = await fetch(
			`https://${FIREBASE_PROJECT_ID}.firebasedatabase.app/user/${uid}/basicInfo.json`,
			{
				method: "PATCH",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					categories: [...originalCategories, newCategory],
				}),
			}
		);

		if (!response.ok) {
			throw new Error("cannot update categories");
		}

		dispatch({ type: ADD_CATEGORY });
	};
};

export const deleteCategory = (uid, category, categoriesList) => {
	return async (dispatch) => {
		const newCategoriesList = categoriesList.filter(
			(item) => item != category
		);

		const response = await fetch(
			`https://${FIREBASE_PROJECT_ID}.firebasedatabase.app/user/${uid}/basicInfo.json`,
			{
				method: "PATCH",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					categories: [...newCategoriesList],
				}),
			}
		);

		if (!response.ok) {
			throw new Error("cannot update categories");
		}

		dispatch({ type: DELETE_CATEGORY });
	};
};

export const inputCategoryChange = (input) => {
	return { type: INPUT_CATEGORY_CHANGE, input: input };
};

export const resetInputCategory = () => {
	return { type: RESET_INPUT_CATEGORY };
};
