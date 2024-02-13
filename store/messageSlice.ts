import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MsgState {
	message: string;
	success: boolean;
}

const initialState: MsgState = {
	message: "",
	success: true,
};

export const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		setMessage: (_, action: PayloadAction<MsgState>) => {
			return action.payload;
		},
		resetMessage: () => {
			return initialState;
		},
	},
});

export const { setMessage, resetMessage } = messageSlice.actions;

export default messageSlice.reducer;
