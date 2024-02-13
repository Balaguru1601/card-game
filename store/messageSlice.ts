import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MsgState {
	message: string;
	success: boolean;
	name?: "cat" | "bomb" | "shuffle" | "defuse";
	index: number | null;
}

const initialState: MsgState = {
	message: "",
	success: true,
	index: null,
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
