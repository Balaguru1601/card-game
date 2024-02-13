import axios from "axios";

export default axios.create({
	baseURL:
		import.meta.env.VITE_MODE === "local"
			? "http://localhost:8080"
			: "https://card-game-server-production-1868.up.railway.app",
});
