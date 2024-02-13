import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
	username: string | null;
	score: string;
}

const initialState: UserState = {
	username: null,
	score: "0",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (_, action: PayloadAction<UserState>) => {
			return action.payload;
		},
		resetUser: () => {
			return initialState;
		},
	},
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
