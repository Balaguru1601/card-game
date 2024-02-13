import { RootState, store } from "../store/store";
import "./App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import CardList from "./components/CardList";
import Defusers from "./components/Defusers";
import Login from "./components/Login";
import { resetUser } from "../store/userSlice";
import { setCards } from "../store/cardSlice";
import LeaderBoard from "./components/LeaderBoard";
import Modal from "./components/Modal";

function App() {
	const dispatch = useDispatch();
	const { username } = useSelector((state: RootState) => state.user);

	const { cards, gameOver, gameWon } = useSelector((state: RootState) => state.card);

	return (
		<Provider store={store}>
			<main className="min-h-[100vh] relative bg-gradient">
				{username ? (
					<>
						<nav className="bg-gray-600 text-xl flex justify-around items-center py-5 absolute z-10 w-full">
							<div></div>
							<div className="font-semibold">Welcome, {username}</div>
							<button
								onClick={() => dispatch(resetUser())}
								className="px-2 py-1 border rounded bg-black text-gray-200 hover:bg-gray-700"
							>
								Logout
							</button>
						</nav>
						<main className="grid grid-cols-[4fr_1fr] pt-16 min-h-[100vh]">
							{gameOver || gameWon ? (
								<div className="text-center pt-24">
									{gameOver && (
										<p className="text-2xl font-semibold text-red-600 my-4">
											You lost! Try again
										</p>
									)}
									{gameWon && (
										<p className="text-2xl font-semibold text-green-600 my-4">
											Hurray! You won!{" "}
										</p>
									)}
									<button
										onClick={() => dispatch(setCards())}
										className="px-3 py-2 border rounded text-2xl bg-black text-gray-200 hover:bg-gray-700"
									>
										Start game
									</button>
								</div>
							) : cards.length > 0 ? (
								<div className="grid grid-cols-[1fr_3fr]">
									<Defusers />
									<CardList />
								</div>
							) : (
								<div className="text-center pt-16">
									<button
										onClick={() => dispatch(setCards())}
										className="px-3 py-2 border rounded text-2xl bg-black text-gray-200 hover:bg-gray-700"
									>
										Start game
									</button>
								</div>
							)}
							<LeaderBoard />
						</main>
					</>
				) : (
					<Login />
				)}
				<div>
					<Modal />
				</div>
			</main>
		</Provider>
	);
}

export default App;
