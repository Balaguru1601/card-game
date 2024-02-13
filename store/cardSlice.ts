import { createListenerMiddleware, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "../src/utils/axios";

export interface CardState {
	card: "cat" | "bomb" | "shuffle" | "defuse";
	open: boolean;
}

const initialState: {
	cards: CardState[];
	lifelines: 0 | 1 | 2 | 3 | 4;
	gameOver: boolean;
	gameWon: boolean;
} = {
	cards: [],
	lifelines: 0,
	gameOver: false,
	gameWon: false,
};

const cardsNames: ("cat" | "bomb" | "shuffle" | "defuse")[] = ["cat", "bomb", "defuse", "shuffle"];

function getRandomCard() {
	console.log(Math.floor(Math.random() * (3 + 1)));
	return { card: cardsNames[Math.floor(Math.random() * 4)], open: false };
}

function getRandomCardsList() {
	const array: CardState[] = [];
	for (let i = 0; i < 5; i++) {
		array.push(getRandomCard());
	}
	return array;
}

export const cardSlice = createSlice({
	name: "card",
	initialState,
	reducers: {
		setCards: (state) => {
			const newCards = getRandomCardsList();
			state.cards = newCards;
			state.gameOver = false;
			state.lifelines = 0;
			state.gameWon = false;
		},
		setOpen: (state, action: PayloadAction<number>) => {
			const index = action.payload;
			if (state.cards[index].card === "defuse") {
				state.lifelines += 1;
				if (state.cards.length === 1) state.gameWon = true;
			} else if (state.cards[index].card === "bomb") {
				if (state.lifelines > 0) {
					if (state.cards.length === 1) state.gameWon = true;
					state.lifelines -= 1;
				} else state.gameOver = true;
			} else if (state.cards[index].card === "cat" && state.cards.length === 1)
				state.gameWon = true;
			state.cards.splice(index, 1);
		},
		setGame: (
			_,
			action: PayloadAction<{
				cards: CardState[];
				lifelines: 0 | 1 | 2 | 3 | 4;
				gameOver: boolean;
				gameWon: boolean;
			}>
		) => {
			return action.payload;
		},
		reset: () => {
			return initialState;
		},
		addLifeline: (state) => {
			if (state.lifelines < 4) state.lifelines += 1;
		},
		removeLifeline: (state) => {
			if (state.lifelines > 0) state.lifelines -= 1;
		},
	},
});

export const { setCards, setOpen, reset, setGame } = cardSlice.actions;

export const cardMiddleware = createListenerMiddleware();

cardMiddleware.startListening({
	matcher: isAnyOf(setCards, setOpen, reset),
	effect: async (action, listenerAPI) => {
		listenerAPI.cancelActiveListeners();
		const { card: data, user } = listenerAPI.getState() as RootState;
		try {
			if (action.type === "card/reset")
				await axios.post("/save-game", { username: user.username, data: null });
			else await axios.post("/save-game", { username: user.username, data });
			if (data.gameWon) {
				await axios.post("/set-score", {
					username: user.username,
					score: String(+user.score + 1),
				});
			}
		} catch (error) {
			console.log(error);
		}
	},
});

export default cardSlice.reducer;
