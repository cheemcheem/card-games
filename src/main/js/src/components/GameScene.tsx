import React, {useState} from "react";
import './GameScene.css';
import './FrontPage.css';
import useGameDetails from "../hooks/useGameDetails";
import GameMenu from "./gamescene/GameMenu";
import GameLobby from "./gamescene/GameLobby";
import GameStarted from "./gamescene/GameStarted";
import useStaticGameDetails from "../hooks/useGameStaticDetails";
import ErrorBoundary from "./error/ErrorBoundary";
import ReactLoading from "react-loading";
import {startGame} from "../utilities/communication";

export default function GameScene({endGame}: { endGame: () => void }) {
  const gameDetails = useGameDetails({endGame});
  const staticGameDetails = useStaticGameDetails({endGame});
  const [showLoadingScreen, setShowLoadingScreen] = useState(undefined as undefined | string);

  const handleStartGame = () => {
    setShowLoadingScreen("Starting Game")
    startGame()
    .then(() => new Promise(resolve => setTimeout(resolve, 2000)))
    .then(() => setShowLoadingScreen(undefined))
    .catch(() => setShowLoadingScreen(undefined))
    ;
  }

  const handleEndGame = () => {
    setShowLoadingScreen("Leaving Game")
    setTimeout(() => {
      endGame();
      setShowLoadingScreen(undefined);
    }, 2000)
    ;
  }

  if (staticGameDetails) {
    return <GameSceneErrorBoundary>
      <div className={"game"}>
        <GameMenu game={staticGameDetails} endGame={handleEndGame}/>
        {showLoadingScreen
            ? <div className={"container"}>
              <h1>{showLoadingScreen}</h1>
              <ReactLoading type={"cylon"}
                            color={getComputedStyle(document.getElementById("root")!).getPropertyValue('--header-color')}/>
            </div>
            : gameDetails?.started
                ? <GameStarted/>
                : <GameLobby startGame={handleStartGame} gameDetails={gameDetails}
                             staticGameDetails={staticGameDetails}/>}
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
