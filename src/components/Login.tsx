import { useState } from "react";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { setGame } from "../../store/cardSlice";

function Login() {
	const [username, setUsername] = useState("");
	const [secret, setSecret] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	async function registerUser(type: "Registration" | "Login") {
		if (username.trim() === "" || secret.trim() === "")
			return setError("All fields are required!");
		setError("");
		const path = type === "Registration" ? "/register" : "/verify-user";
		try {
			setLoading(true);
			const response = await axios.post(path, {
				Username: username,
				Secret: secret,
			});
			if (response.data.success) {
				dispatch(setUser({ username, score: response.data.score }));
				const gameData = await axios.get("/get-game/" + username);
				if (gameData.data.success) {
					if (gameData.data.data) dispatch(setGame(gameData.data.data));
				}
			} else setError(response.data.message);
			setLoading(false);
		} catch (error) {
			console.log("error", error);
			setLoading(false);
			setError(type + " failure! Try again.");
		}
	}

	return (
		<div className=" p-8 bg-[rgb(0,0,0,0.5)] w-[300px] rounded-lg mx-auto text-center">
			<p className="font-semibold text-white">{loading ? "Loading.." : "Login to play!"}</p>
			{error.length > 0 && <p className="text-red-400 font-semibold">{error}</p>}
			<input
				type="text"
				value={username}
				onChange={(e) => {
					setUsername(e.target.value);
					setError("");
				}}
				placeholder="Username"
				className="rounded px-2 py-1 text-white my-3 placeholder:text-gray-200 foutline-none"
			/>
			<input
				type="text"
				value={secret}
				onChange={(e) => {
					setSecret(e.target.value);
					setError("");
				}}
				placeholder="Secret"
				className="rounded px-2 py-1 my-3 text-white placeholder:text-gray-200"
			/>
			<div className="flex gap-4 mt-2 justify-center">
				<button
					onClick={() => registerUser("Login")}
					className="px-2 py-1 border rounded bg-black text-gray-200 hover:bg-gray-700"
					disabled={loading}
				>
					Login
				</button>
				<button
					onClick={() => registerUser("Registration")}
					className="px-2 py-1 border rounded bg-black text-gray-200 hover:bg-gray-700"
					disabled={loading}
				>
					Register
				</button>
			</div>
		</div>
	);
}

export default Login;
