import { useDispatch, useSelector } from "react-redux";
import { resetMessage } from "../../store/messageSlice";
import { RootState } from "../../store/store";
import { setCards, setOpen } from "../../store/cardSlice";

const data = {
	cat: "You got a cat card😼! Wohoo!",
	shuffle: "It's a shuffle🔀. Haha, you just started again!",
	bomb: "Whoops, you just exploded! Boom💥.",
	defuse: "Defuse. Use it when required😉.",
};

function Modal() {
	const { message, success, name, index } = useSelector((state: RootState) => state.message);
	const dispatch = useDispatch();

	const handleContinue = () => {
		dispatch(resetMessage());
		if (name === "shuffle") dispatch(setCards());
		else dispatch(setOpen(index!));
	};

	return (
		<div
			className={`absolute w-[100vw] h-[100vh] top-0 left-0 z-20 bg-[rgba(255,255,255,0.3)] ${
				message.length > 0 ? "" : "hidden"
			}`}
		>
			<div
				tabIndex={-1}
				className="opacity-100 fixed justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
				// onBlur={()}
			>
				<div className="relative p-4 top-[50vh] -translate-x-1/2 -translate-y-1/2 left-[50vw] w-full max-w-2xl max-h-full">
					<div className="bg-white rounded-lg shadow dark:bg-gray-800 text-center">
						<div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
							<h3 className="text-xl mx-auto font-semibold capitalize text-gray-900 dark:text-white">
								{name} card
							</h3>
						</div>
						<div className="w-[250px] my-2 h-[320px] mx-auto border rounded-lg overflow-hidden">
							<header className="w-full aspect-square">
								<img src={`/${name}.jpg`} alt={name + " card"} />
							</header>
							<p className="text-lg inline-block font-bold text-center px-2 py-2">
								{data[name!]}
							</p>
						</div>
						{message.length > 0 ? (
							<div
								className={`${
									success ? "bg-green-600 " : "bg-red-500 "
								} text-gray-300 text-2xl px-4 py-2 rounded-lg block`}
							>
								{message}
							</div>
						) : null}
						<div className="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button
								onClick={handleContinue}
								className="text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded-lg px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Continue
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;
