import React from "react";

export default function GameStarted() {
  return <>
    <div className={"card-deck"}>
      <h2>Your Cards</h2>
      <ul className={"cards"}>
        {/*{game.hand.map(card => <Card key={card.number + card.suit} card={card}/>)}*/}
      </ul>
    </div>
  </>
}