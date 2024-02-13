import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setUser } from "../../store/userSlice";
import { reset } from "../../store/cardSlice";

function LeaderBoard() {
	const [data, setData] = useState<{ username: string; score: string }[]>([]);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const { gameWon } = useSelector((state: RootState) => state.card);
	const { username, score } = useSelector((state: RootState) => state.user);

	async function getLeaderBoard() {
		try {
			setLoading(true);
			const response = await axios.get("/leaderboard");
			const d: { username: string; score: string }[] = response.data.data;
			setData(d);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}
	useEffect(() => {
		if (gameWon) {
			axios
				.post("/set-score", {
					username: username,
					score: String(+score + 1),
				})
				.then((data) => {
					if (data.data.success) {
						const {
							username,
							score,
						}: {
							username: string;
							score: string;
						} = data.data;
						dispatch(setUser({ username, score }));
					}
					setTimeout(() => {
						dispatch(reset());
					}, 700);
					getLeaderBoard();
				});
		}
	}, [gameWon]);

	useEffect(() => {
		getLeaderBoard();
	}, []);

	return (
		<div className="px-2 md:px-4 bg-black">
			<div className="flex justify-between mt-8 mb-4 items-center flex-wrap">
				<p className="text-2xl font-semibold text-white text-center inline-block ">
					Leaderboard
				</p>
				<button
					title="Refresh"
					className="text-white hover:text-gray-400"
					onClick={getLeaderBoard}
					disabled={loading}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						id="refresh"
						fill="white"
						width={32}
						height={32}
					>
						<g data-name="Layer 2">
							<path
								d="M20.3 13.43a1 1 0 0 0-1.25.65A7.14 7.14 0 0 1 12.18 19 7.1 7.1 0 0 1 5 12a7.1 7.1 0 0 1 7.18-7 7.26 7.26 0 0 1 4.65 1.67l-2.17-.36a1 1 0 0 0-1.15.83 1 1 0 0 0 .83 1.15l4.24.7h.17a1 1 0 0 0 .34-.06.33.33 0 0 0 .1-.06.78.78 0 0 0 .2-.11l.09-.11c0-.05.09-.09.13-.15s0-.1.05-.14a1.34 1.34 0 0 0 .07-.18l.75-4a1 1 0 0 0-2-.38l-.27 1.45A9.21 9.21 0 0 0 12.18 3 9.1 9.1 0 0 0 3 12a9.1 9.1 0 0 0 9.18 9A9.12 9.12 0 0 0 21 14.68a1 1 0 0 0-.7-1.25z"
								data-name="refresh"
							></path>
						</g>
					</svg>
				</button>
			</div>
			{loading ? (
				"loading.."
			) : (
				<div className="border rounded-lg overflow-hidden">
					<div className=" border rounded-t-lg border-b-2 w-full grid font-semibold text-lg grid-cols-2">
						<header className="border-r-2 pl-2  py-2 text-wrap">Username</header>
						<header className="pl-2   py-2">Score</header>
					</div>
					{data.map((item) => (
						<div
							key={Math.random()}
							className={`border border-t-0 w-full grid grid-cols-2 last:rounded-b-lg capitalize ${
								username === item.username ? "text-red-600 font-bold" : ""
							}`}
						>
							<p className="border-r pl-2 py-1 text-wrap">{item.username}</p>
							<p className="pl-2 py-1">{item.score}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default LeaderBoard;
