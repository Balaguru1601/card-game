import { useDispatch } from "react-redux";
import { setMessage } from "../../store/messageSlice";

interface Props {
	name: "cat" | "bomb" | "shuffle" | "defuse";
	open: boolean;
	index: number;
	disableOthers: number | null;
	setDisableOthers: (val: number | null) => void;
}

const Card = function (props: Props) {
	// const [isFlipped, setIsFlipped] = useState(false);
	// const [isAnimating, setIsAnimating] = useState(false);

	const dispatch = useDispatch();

	function handleFlip() {
		if (props.name === "shuffle")
			dispatch(
				setMessage({
					message: "You just started again!",
					success: true,
					index: props.index,
					name: props.name,
				})
			);
		else if (props.name === "cat")
			dispatch(
				setMessage({
					message: "Wohoo, just contnue playing!!",
					success: true,
					index: props.index,
					name: props.name,
				})
			);
		else if (props.name === "defuse")
			dispatch(
				setMessage({
					message: "Use this as a lifeline in future",
					success: true,
					index: props.index,
					name: props.name,
				})
			);
		else if (props.name === "bomb")
			dispatch(
				setMessage({
					message: "You got bombed!",
					success: false,
					index: props.index,
					name: props.name,
				})
			);
	}

	return (
		<div className="w-[300px] h-[380px] p-0 mb-4" onClick={handleFlip}>
			<div className="w-[100%] h-[100%] ">
				<div className="w-[100%] h-[100%] bg-black border rounded-lg overflow-hidden"></div>
			</div>
		</div>
	);
};

export default Card;
