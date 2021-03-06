import React, {useCallback, useState} from "react";
import './FrontPage.css';
import Form from "./frontpage/Form";
import Username from "./frontpage/Username";
import RoomCode from "./frontpage/RoomCode";
import SubmitButton from "./frontpage/SubmitButton";
import {
  FormInputEnabledContext,
  GameTypeInputContext,
  NameInputContext,
  RoomCodeInputContext
} from "../common/contexts";
import GameDropDown from "./frontpage/GameDropDown";
import ErrorBoundary from "./common/ErrorBoundary";
import LoadingScreen from "./common/LoadingScreen";
import {LogLevel} from "../utilities/log";
import useSaveState from "../hooks/useSaveState";
import useLoggedIn from "../hooks/useLoggedIn";
import useGameTypes from "../hooks/useGameTypes";
import {joinExistingGame, startNewGame} from "../utilities/communication";


export default function FrontPage({startGame}: { startGame: () => void }) {
  const [showLoadingScreen, setShowLoadingScreen] = useState(undefined as undefined | string);
  const [joinGameId, setJoinGameId] = useSaveState("", "joinGameId");
  const [joinGameName, setJoinGameName] = useSaveState("", "joinGameName");

  const loggedIn = useLoggedIn();
  const [gameTypes, gameType, setGameType] = useGameTypes();

  const handleClickNewGame = useCallback(() => {
    setShowLoadingScreen("Creating New Game");
    startNewGame(gameType, joinGameName)
    .then(startGame)
    .catch(() => console.log("Failed to create new game...", LogLevel.ERROR))
  }, [setShowLoadingScreen, gameType, joinGameName, startGame]);

  const handleClickJoinGame = useCallback(() => {
    setShowLoadingScreen("Joining Game");
    const joinGame = joinGameId
        ? joinExistingGame(joinGameId!, joinGameName).then(startGame)
        : Promise.resolve();
    joinGame
    .then(() => new Promise(resolve => setTimeout(resolve, 2000)))
    .catch(() => console.log("Failed to join game...", LogLevel.ERROR))
  }, [setShowLoadingScreen, joinGameId, joinGameName, startGame]);

  return <FrontPageErrorBoundary>
    <header className={"menu"}>
      <h1 className={"menu-text"}>Welcome to cards.</h1>
    </header>
    <div className={"container"}>
      <LoadingScreen showLoadingScreen={showLoadingScreen}>
        <NameInputContext.Provider value={{joinGameName, setJoinGameName}}>
          <GameTypeInputContext.Provider value={{gameType, setGameType, gameTypes}}>
            <RoomCodeInputContext.Provider
                value={{joinGameId, setJoinGameId}}><FormInputEnabledContext.Provider
                value={{enabled: loggedIn}}>
              <div className={"container-child"}>
                <FormInputEnabledContext.Consumer>{({enabled}) =>
                    enabled
                        ? <></>
                        : <h2 className={"menu-text warn"}>Experiencing connection issues...</h2>
                }</FormInputEnabledContext.Consumer>
                <Form submitAction={handleClickNewGame}>
                  <GameDropDown/>
                  <Username/>
                  <SubmitButton value={"Start new game"}/>
                </Form>
                <h1>OR</h1>
                <Form submitAction={handleClickJoinGame}>
                  <RoomCode/>
                  <Username/>
                  <SubmitButton value={"Join an existing game"}/>
                </Form>
              </div>
            </FormInputEnabledContext.Provider>
            </RoomCodeInputContext.Provider>
          </GameTypeInputContext.Provider>
        </NameInputContext.Provider>
      </LoadingScreen>
    </div>
  </FrontPageErrorBoundary>
}

function FrontPageErrorBoundary(props: React.PropsWithChildren<any>) {
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
