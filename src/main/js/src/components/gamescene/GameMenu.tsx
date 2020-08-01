import React from "react";
import {GameStaticDetails} from "../../common/types";
import ErrorBoundary from "../common/ErrorBoundary";
import GameMenuVertical from "./GameMenuVertical";

export default function GameMenu({game, endGame}: { game?: GameStaticDetails, endGame: () => void }) {

  return <GameMenuErrorBoundary>
    <header className={"menu"}>
      <div className={"menu-h"}>
        <GameMenuVertical header={"Welcome"} text={game?.userName}/>
        <GameMenuVertical header={"Room Code"} text={game?.id}/>
        <GameMenuVertical header={"Game Type"} text={game?.gameType}/>
      </div>
      <button className={"menu-button"}
              onClick={endGame}>
        {(game?.owner === game?.userName) ? "End Game" : "Exit Game"}
      </button>
    </header>
  </GameMenuErrorBoundary>
}

function GameMenuErrorBoundary(props: React.PropsWithChildren<any>) {
  const renderError = <>
    <header className={"menu"}>
      <div className={"menu-v"} style={{width: "auto"}}>
        <h2 className={"menu-text warn"}>Something went wrong displaying the game menu.</h2>
      </div>
    </header>
  </>;
  return <ErrorBoundary renderError={renderError}>{props.children}</ErrorBoundary>
}
