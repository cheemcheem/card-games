import React, {useCallback, useState} from "react";
import './GameScene.css';
import './FrontPage.css';
import useGameDetails from "../hooks/useGameDetails";
import GameMenu from "./gamescene/GameMenu";
import useStaticGameDetails from "../hooks/useGameStaticDetails";
import ErrorBoundary from "./common/ErrorBoundary";
import {deleteGame, exitGame, startGame} from "../utilities/communication";
import LoadingScreen from "./common/LoadingScreen";
import {log, LogLevel} from "../utilities/log";
import GameLobby from "./gamescene/GameLobby";
import GameStarted from "./gamescene/GameStarted";

export default function GameScene({endGame}: { endGame: () => Promise<void> }) {
  const [showLoadingScreen, setShowLoadingScreen] = useState(undefined as undefined | string);
  const handleGameEndedUnexpectedly = useCallback(() => {
    setShowLoadingScreen("Game Ended");
    new Promise(resolve => setTimeout(resolve, 2000))
    .then(endGame)
    .then(() => setShowLoadingScreen(undefined))
    .catch(() => log("Failed to leave ended game...", LogLevel.ERROR));
  }, [setShowLoadingScreen, endGame]);

  const staticGameDetails = useStaticGameDetails({endGame: handleGameEndedUnexpectedly});
  const handleEndGame = useCallback(() => {
    setShowLoadingScreen("Leaving Game");
    const isOwner = staticGameDetails?.owner === staticGameDetails?.userName;
    (isOwner ? deleteGame() : exitGame())
    .then(() => setShowLoadingScreen(undefined))
    .then(endGame)
    .catch(() => log("Failed to leave game...", LogLevel.ERROR));
  }, [setShowLoadingScreen, endGame, staticGameDetails]);

  const [gameStarted, setGameStarted] = useState(false);
  const handleStartGame = useCallback(() => {
    setShowLoadingScreen("Starting Game")
    setGameStarted(true);
    startGame()
    .catch(() => log("Failed to start new game...", LogLevel.ERROR))
    .finally(() => setShowLoadingScreen(undefined))
  }, [setShowLoadingScreen, setGameStarted]);


  const gameDetails = useGameDetails({endGame: handleGameEndedUnexpectedly});
  const gameStartedByUserOrHost = gameStarted || gameDetails?.started;

  return <GameSceneErrorBoundary>
    <div className={"game"}>
      <GameMenu game={staticGameDetails} endGame={handleEndGame}/>
      <div className={"container"}>
        <LoadingScreen
            showLoadingScreen={staticGameDetails === undefined ? "Loading Game" : undefined}>
          <LoadingScreen showLoadingScreen={showLoadingScreen}>
            {gameStartedByUserOrHost
                ? <GameStarted gameDetails={gameDetails}
                               staticGameDetails={staticGameDetails!}/>
                : <GameLobby startGame={handleStartGame}
                             gameDetails={gameDetails}
                             staticGameDetails={staticGameDetails!}
                />}
          </LoadingScreen>
        </LoadingScreen>
      </div>
    </div>
  </GameSceneErrorBoundary>
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
