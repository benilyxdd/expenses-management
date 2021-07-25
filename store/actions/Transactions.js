export const SIMPLE_INPUT_CHANGE = "SIMPLE_INPUT_CHANGE";
export const RESET_INPUT = "RESET_INPUT";

export const simpleInputChange = (input) => {
	return { type: SIMPLE_INPUT_CHANGE, input: input };
};

export const resetInput = () => {
	return { type: RESET_INPUT };
};
