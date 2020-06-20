import React from 'react';
import './App.css';
import FrontPage from "./components/FrontPage";
import GameScene from "./components/GameScene";
import {joinExistingGame, startNewGame} from './utilities/communication';
import useLoggedIn from "./hooks/useLoggedIn";
import useSaveState from "./hooks/useSaveState";
import {NameInputContext, RoomCodeInputContext, FormInputEnabledContext} from './common/contexts';

export default function App() {
  const [gameStarted, setGameStarted] = useSaveState(false, "gameStarted");
  const [joinGameId, setJoinGameId] = useSaveState("", "joinGameId");
  const [joinGameName, setJoinGameName] = useSaveState("", "joinGameName");
  const loggedIn = useLoggedIn();

  const endGame = () => setGameStarted(false);
  const newGame = () => startNewGame().then(() => setGameStarted(true))
  const joinGame = () => {
    if (joinGameId) {
      joinExistingGame(joinGameId!).then(() => setGameStarted(true))
    }
  };


  return <NameInputContext.Provider value={{joinGameName, setJoinGameName}}>
    <RoomCodeInputContext.Provider value={{joinGameId, setJoinGameId}}>
      <FormInputEnabledContext.Provider value={{enabled: loggedIn}}>
        <main>
          {
            gameStarted
                ? <GameScene endGame={endGame}/>
                : <FrontPage clickNewGame={newGame}
                             clickJoinGame={joinGame}/>
          }
        </main>
      </FormInputEnabledContext.Provider>
    </RoomCodeInputContext.Provider>
  </NameInputContext.Provider>
}
