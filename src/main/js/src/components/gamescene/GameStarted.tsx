import Card from "../subcomponents/Card";
import React from "react";
import {CardType} from "../../common/types";

export default function GameStarted({game}: { game: { hand: CardType[] } }) {
  return <>
    <div className={"card-deck"}>
      <h2>Your Cards</h2>
      <ul className={"cards"}>
        {game.hand.map(card => <Card key={card.number + card.suit} card={card}/>)}
      </ul>
    </div>
  </>
}