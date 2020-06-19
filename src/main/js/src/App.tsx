import React from 'react';
import './App.css';
import FrontPage from "./components/FrontPage";
import GameScene from "./components/GameScene";
import {joinExistingGame, startNewGame} from './utilities/communication';
import useLoggedIn from "./hooks/useLoggedIn";
import useSaveState from "./hooks/useSaveState";
import {log} from "./utilities/log";

export default function App() {
  const [gameStarted, setGameStarted] = log(useSaveState(false, "gameStarted"));
  const [joinGameId, setJoinGameId] = useSaveState("", "joinGameId");
  const [, setJoinGameName] = useSaveState("", "joinGameName");
  const loggedIn = useLoggedIn();

  log({gameStarted, joinGameId});
  const endGame = () => {
    console.log("ending game")
    setGameStarted(false);
  }

  const newGame = () => {
    startNewGame().then(() => setGameStarted(true));
  }

  const joinGame = () => {
    if (joinGameId) {
      joinExistingGame(joinGameId!).then(() => setGameStarted(true))
    }
  }


  return <>
    <main>
      {
        gameStarted
            ? <GameScene endGame={endGame}/>
            : <FrontPage enabled={loggedIn}
                         clickNewGame={newGame}
                         setJoinGameId={setJoinGameId}
                         setJoinGameName={setJoinGameName}
                         clickJoinGame={joinGame}/>
      }
    </main>
  </>;
}
