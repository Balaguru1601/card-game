import { configureStore } from "@reduxjs/toolkit";
import cardSlice, { cardMiddleware } from "./cardSlice";
import messageSlice from "./messageSlice";
import userSlice from "./userSlice";

export const store = configureStore({
	reducer: {
		card: cardSlice,
		message: messageSlice,
		user: userSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
