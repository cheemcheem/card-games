import React from "react";
import ErrorBoundary from "../common/ErrorBoundary";
import Card from "../subcomponents/Card";
import LoadingScreen from "../common/LoadingScreen";
import {GameDetails, GameStaticDetails} from "../../common/types";
import GamePlayers from "./GamePlayers";

export default function GameStarted({gameDetails, staticGameDetails}: { gameDetails?: GameDetails, staticGameDetails: GameStaticDetails }) {
  return <GameStartedErrorBoundary>
    <div className={"container"}>
      <LoadingScreen showLoadingScreen={gameDetails ? undefined : "Loading Game"}>
        <GamePlayers owner={staticGameDetails.owner}
                     userName={staticGameDetails.owner}
                     players={gameDetails?.players}/>
        <div className={"card-deck"}>
          <h2>Your Cards</h2>
          <ul className={"cards"}>
            {/*{game.hand.map(card => <Card key={card.number + card.suit} card={card}/>)}*/}
            <Card key={"AClubs"} card={{suit: "Clubs", number: "A"}}/>
            <Card key={"2Clubs"} card={{suit: "Clubs", number: "2"}}/>
            <Card key={"3Clubs"} card={{suit: "Clubs", number: "3"}}/>
            <Card key={"4Clubs"} card={{suit: "Clubs", number: "4"}}/>
          </ul>
        </div>
      </LoadingScreen>
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
