import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { resetMessage } from "../../store/messageSlice";

function MessageBox() {
	const { message, success } = useSelector((state: RootState) => state.message);
	const dispatch = useDispatch();
	useEffect(() => {
		const t = setTimeout(() => {
			dispatch(resetMessage());
			console.log("run");
		}, 2000);

		() => clearTimeout(t);
	}, [message.length, dispatch]);
	return (
		<>
			{message.length > 0 ? (
				<div
					className={`${
						success ? "bg-green-600 " : "bg-red-500 "
					} text-gray-300 text-2xl px-4 py-2 rounded-lg block`}
				>
					{message}
				</div>
			) : null}
		</>
	);
}

export default MessageBox;
