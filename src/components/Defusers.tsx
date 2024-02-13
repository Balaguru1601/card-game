import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function Defusers() {
	const lifelines = useSelector((state: RootState) => state.card.lifelines);
	const arr = Array.from(Array(lifelines).keys());
	return (
		<div className="pt-8 px-2 md:px-4">
			<p className="text-xl mb-4">Defusers available </p>
			{arr.map(() => (
				<div key={Math.random()} className="card w-[240px] p-0 mb-4">
					<div className="w-[100%] h-[100%] border rounded-lg overflow-hidden">
						<header className="w-full aspect-square">
							<img src={`/defuse.jpg`} alt={"defuse card"} />
						</header>
						<p className="text-lg inline-block font-bold text-center px-2 py-2">
							Defuse. Activated when a bomb is encountered😉.
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

export default Defusers;
