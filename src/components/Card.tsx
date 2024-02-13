import { useState } from "react";
import { motion } from "framer-motion";
import { setCards, setOpen } from "../../store/cardSlice";
import { useDispatch } from "react-redux";
import { setMessage } from "../../store/messageSlice";

interface Props {
	name: "cat" | "bomb" | "shuffle" | "defuse";
	open: boolean;
	index: number;
	disableOthers: boolean;
	setDisableOthers: (val: boolean) => void;
}

const data = {
	cat: "You got a cat card😼! Wohoo!",
	shuffle: "It's a shuffle🔀. Haha, you just started again!",
	bomb: "Whoops, you just exploded! Boom💥.",
	defuse: "Defuse. Use it when required😉.",
};

function Card(props: Props) {
	const [isFlipped, setIsFlipped] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	const dispatch = useDispatch();

	function handleFlip() {
		console.log(props.disableOthers);
		if (!isAnimating && !isFlipped) {
			console.log("in");
			setIsFlipped(!isFlipped);
			setIsAnimating(true);
		}
	}

	return (
		<div className="card w-[300px] h-[380px] p-0 mb-4" onClick={handleFlip}>
			<motion.div
				className="card-content w-[100%] h-[100%] "
				initial={false}
				animate={{ rotateY: isFlipped ? 180 : 360 }}
				transition={{ duration: 0.3, animationDirection: "normal" }}
				onAnimationComplete={() => {
					setIsAnimating(false);
					setTimeout(() => {
						if (props.name === "shuffle")
							dispatch(
								setMessage({ message: "You just started again!", success: true })
							);
						else if (props.name === "cat")
							dispatch(
								setMessage({
									message: "Wohoo, just contnue playing!!",
									success: true,
								})
							);
						else if (props.name === "defuse")
							dispatch(
								setMessage({
									message: "Use this as a lifeline in future",
									success: true,
								})
							);
						else if (props.name === "bomb")
							dispatch(setMessage({ message: "You got bombed!", success: false }));
						if (props.name === "shuffle") dispatch(setCards());
						else dispatch(setOpen(props.index));
						props.setDisableOthers(false);
					}, 1500);
					return;
				}}
			>
				<div className="card-front w-[100%] h-[100%] bg-black border rounded-lg overflow-hidden"></div>
				<div className="card-back w-[100%] h-[100%] border rounded-lg overflow-hidden">
					<header className="w-full aspect-square">
						<img src={`/${props.name}.jpg`} alt={props.name + " card"} />
					</header>
					<p className="text-lg inline-block font-bold text-center px-2 py-2">
						{data[props.name]}
					</p>
				</div>
			</motion.div>
		</div>
	);
}

export default Card;
