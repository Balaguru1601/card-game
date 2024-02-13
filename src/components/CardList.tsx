// type Props = {}

// import { useEffect } from "react";
// import { setCards } from "../../store/cardSlice";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import Card from "./Card";
import { useState } from "react";

function CardList() {
	const { cards } = useSelector((state: RootState) => state.card);
	const [disableOthers, setDisableOthers] = useState(false);

	function disableSetter(val: boolean) {
		setDisableOthers(val);
	}

	return (
		<div className="w-full bg-slate-500 pt-8">
			<div className="flex flex-wrap justify-around">
				{cards.map((card, index) => (
					<Card
						key={Math.random()}
						setDisableOthers={disableSetter}
						disableOthers={disableOthers}
						index={index}
						name={card.card}
						open={card.open}
					/>
				))}
			</div>
		</div>
	);
}

export default CardList;
