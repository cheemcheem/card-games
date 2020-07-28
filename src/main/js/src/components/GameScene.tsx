import React from "react";
import './GameScene.css';
import './FrontPage.css';
import useGame from "../hooks/useGame";
import GameMenu from "./gamescene/GameMenu";
import GameLobby from "./gamescene/GameLobby";
import GameStarted from "./gamescene/GameStarted";

export default function GameScene() {
  const game = useGame();

  if (game) {
    return <div className={"game"}>
      <GameMenu game={game}/>
      {game.started ? <GameStarted game={game}/> : <GameLobby game={game}/>}
    </div>
  }

  return <></>;

}