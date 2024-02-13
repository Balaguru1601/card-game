import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function LeaderBoard() {
	const [data, setData] = useState<{ username: string; score: string }[]>([]);
	const [loading, setLoading] = useState(false);

	const { gameOver, gameWon } = useSelector((state: RootState) => state.card);
	const { username } = useSelector((state: RootState) => state.user);

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
		getLeaderBoard();
	}, [gameOver, gameWon]);

	return (
		<div className="px-2 md:px-4 bg-black">
			<p className="text-2xl mt-8 font-semibold text-white mb-4 text-center">Leaderboard</p>
			{loading ? (
				"loading.."
			) : (
				<div className="border rounded-lg overflow-hidden">
					<div className=" border rounded-t-lg border-b-2 w-full grid text-xl grid-cols-2">
						<header className="border-r-2 pl-2 font-semibold py-2">Username</header>
						<header className="pl-2  font-semibold py-2">Score</header>
					</div>
					{data.map((item) => (
						<div
							key={Math.random()}
							className={`border border-t-0 w-full grid grid-cols-2 last:rounded-b-lg capitalize ${
								username === item.username ? "text-red-600 font-bold" : ""
							}`}
						>
							<p className="border-r pl-2 py-1">{item.username}</p>
							<p className="pl-2 py-1">{item.score}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default LeaderBoard;
