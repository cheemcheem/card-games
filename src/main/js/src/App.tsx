import React from 'react';
import './App.css';
import {joinExistingGame, startNewGame} from './utilities/communication';
import useLoggedIn from "./hooks/useLoggedIn";
import useSaveState from "./hooks/useSaveState";
import useGameTypes from "./hooks/useGameTypes";
import {
  EndGameContext,
  FormInputEnabledContext,
  GameTypeInputContext,
  NameInputContext,
  RoomCodeInputContext
} from "./common/contexts";
import FrontPage from "./components/FrontPage";
import GameScene from "./components/GameScene";
import ErrorBoundary from "./components/error/ErrorBoundary";

export default function App() {
  const [gameStarted, setGameStarted] = useSaveState(false, "gameStarted");
  const [joinGameId, setJoinGameId] = useSaveState("", "joinGameId");
  const [joinGameName, setJoinGameName] = useSaveState("", "joinGameName");

  const loggedIn = useLoggedIn();
  const [gameTypes, gameType, setGameType] = useGameTypes();

  const endGame = () => setGameStarted(false);
  const newGame = () => startNewGame(gameType, joinGameName).then(() => setGameStarted(true))
  const joinGame = () => {
    if (joinGameId) {
      joinExistingGame(joinGameId!, joinGameName).then(() => setGameStarted(true))
    }
  };

  return <AppErrorBoundary>
    <main>{
      gameStarted
          ? <>
            <EndGameContext.Provider value={{endGame}}>
              <GameScene/>
            </EndGameContext.Provider>
          </>
          : <>
            <NameInputContext.Provider value={{joinGameName, setJoinGameName}}>
              <GameTypeInputContext.Provider value={{gameType, setGameType, gameTypes}}>
                <RoomCodeInputContext.Provider value={{joinGameId, setJoinGameId}}>
                  <FormInputEnabledContext.Provider value={{enabled: loggedIn}}>
                    <FrontPage clickNewGame={newGame} clickJoinGame={joinGame}/>
                  </FormInputEnabledContext.Provider>
                </RoomCodeInputContext.Provider>
              </GameTypeInputContext.Provider>
            </NameInputContext.Provider>
          </>
    }</main>
  </AppErrorBoundary>
}


function AppErrorBoundary(props: React.PropsWithChildren<any>) {
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
