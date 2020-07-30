import React from "react";
import ErrorBoundary from "../error/ErrorBoundary";

export default function GameStarted() {
  return <GameStartedErrorBoundary>
    <div className={"card-deck"}>
      <h2>Your Cards</h2>
      <ul className={"cards"}>
        {/*{game.hand.map(card => <Card key={card.number + card.suit} card={card}/>)}*/}
      </ul>
    </div>
  </GameStartedErrorBoundary>
}

function GameStartedErrorBoundary(props: React.PropsWithChildren<any>) {
  const renderError = <>
    <div className={"container"}>
      <h2 className={"warn"}>Something went wrong displaying the game.</h2>
    </div>
  </>;
  return <ErrorBoundary renderError={renderError}>{props.children}</ErrorBoundary>
}
