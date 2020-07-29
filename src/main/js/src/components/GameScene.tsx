import React from "react";
import './GameScene.css';
import './FrontPage.css';
import useGameDetails from "../hooks/useGameDetails";
import GameMenu from "./gamescene/GameMenu";
import GameLobby from "./gamescene/GameLobby";
import GameStarted from "./gamescene/GameStarted";
import useStaticGameDetails from "../hooks/useGameStaticDetails";
import ErrorBoundary from "./error/ErrorBoundary";

export default function GameScene() {
  const gameDetails = useGameDetails();
  const staticGameDetails = useStaticGameDetails();

  if (staticGameDetails) {
    return <GameSceneErrorBoundary>
      <div className={"game"}>
        <GameMenu game={staticGameDetails}/>
        {gameDetails?.started
            ? <GameStarted/>
            : <GameLobby gameDetails={gameDetails} staticGameDetails={staticGameDetails}/>}
      </div>
    </GameSceneErrorBoundary>
  }

  return <></>;

}

function GameSceneErrorBoundary(props: React.PropsWithChildren<any>) {
  const renderError = <>
    <div className={"game"}>
      <header className={"menu"}>
        <h2>{'\u00A0'}</h2>
      </header>
      <div className={"container"}>
        <h2 className={"warn"}>Something went wrong.</h2>
      </div>
    </div>
  </>;
  return <ErrorBoundary renderError={renderError}>{props.children}</ErrorBoundary>
}
