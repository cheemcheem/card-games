import React from "react";
import {GameDetails, GameStaticDetails} from "../../common/types";
import ErrorBoundary from "../error/ErrorBoundary";

export default function GameLobby({startGame, gameDetails, staticGameDetails}: { startGame: () => void, gameDetails?: GameDetails, staticGameDetails: GameStaticDetails }) {
  return <GameLobbyErrorBoundary>
    <div className={"container"}>
      <div className={"container-child"}>
        <h2>Players</h2>
        <ul className={"players"}>
          {gameDetails?.players.map(player => <li key={player}>
            {player + (player === staticGameDetails.owner ? " (host)" : player === staticGameDetails.userName ? " (you)" : "")}
          </li>)}
        </ul>
        {(staticGameDetails.owner === staticGameDetails.userName)
            ? <button className={"container-button"} onClick={startGame}>Everyone Joined?</button>
            : <label>Waiting for host...</label>}
      </div>
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
