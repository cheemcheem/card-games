import React from "react";
import ErrorBoundary from "../common/ErrorBoundary";
import {GameDetails, GameStaticDetails} from "../../common/types";
import GamePlayers from "./GamePlayers";

export default function GameLobby({gameDetails, staticGameDetails, startGame}: { gameDetails?: GameDetails, staticGameDetails: GameStaticDetails, startGame: () => void }) {
  return <GameLobbyErrorBoundary>
    <div className={"container"}>
      <GamePlayers owner={staticGameDetails.owner} userName={staticGameDetails.owner}
                   players={gameDetails?.players}>
        {(staticGameDetails.owner === staticGameDetails.userName)
            ? <button className={"container-button"} onClick={startGame}>Everyone Joined?</button>
            : <label>Waiting for host...</label>}
      </GamePlayers>
    </div>
  </GameLobbyErrorBoundary>
}

function GameLobbyErrorBoundary(props: React.PropsWithChildren<any>) {
  const renderError = <>
    <div className={"container"}>
      <h2 className={"warn"}>Something went wrong displaying the game lobby.</h2>
    </div>
  </>;
  return <ErrorBoundary renderError={renderError}>{props.children}</ErrorBoundary>
}
