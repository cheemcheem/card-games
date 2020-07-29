import React from "react";
import './GameScene.css';
import './FrontPage.css';
import useGameDetails from "../hooks/useGameDetails";
import GameMenu from "./gamescene/GameMenu";
import GameLobby from "./gamescene/GameLobby";
import GameStarted from "./gamescene/GameStarted";
import useStaticGameDetails from "../hooks/useGameStaticDetails";

export default function GameScene() {
  const gameDetails = useGameDetails();
  const staticGameDetails = useStaticGameDetails();

  if (staticGameDetails) {
    return <div className={"game"}>
      <GameMenu game={staticGameDetails}/>
      {gameDetails?.started ? <GameStarted/> :
          <GameLobby gameDetails={gameDetails} staticGameDetails={staticGameDetails}/>}
    </div>
  }

  return <></>;

}