import React from 'react';
import './App.css';
import useSaveState from "./hooks/useSaveState";
import FrontPage from "./components/FrontPage";
import GameScene from "./components/GameScene";
import ErrorBoundary from "./components/common/ErrorBoundary";

export default function App() {
  const [gameStarted, setGameStarted] = useSaveState(false, "gameStarted");
  const endGame = async () => setGameStarted(false);
  const startGame = async () => setGameStarted(true);
  return <AppErrorBoundary>
    <main>{
      gameStarted
          ? <GameScene endGame={endGame}/>
          : <FrontPage startGame={startGame}/>
    }</main>
  </AppErrorBoundary>
}


function AppErrorBoundary(props: React.PropsWithChildren<any>) {
  const renderError = <main>
    <div className={"game"}>
      <header className={"menu"}>
        <h2>{'\u00A0'}</h2>
      </header>
      <div className={"container"}>
        <h2 className={"warn"}>Something went wrong.</h2>
      </div>
    </div>
  </main>
  return <ErrorBoundary renderError={renderError}>{props.children}</ErrorBoundary>
}
