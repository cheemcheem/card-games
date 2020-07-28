import React from "react";
import {deleteGame, exitGame, startGame} from "../utilities/communication";
import './GameScene.css';
import './FrontPage.css';
import useGame from "../hooks/useGame";
import {EndGameContext} from "../common/contexts";
import Card from "./subcomponents/Card";

export default function GameScene() {

  const game = useGame();

  if (!game) {
    return <></>;
  }
  const isOwner = game.owner === game.userName;


  return <>
    <div className={"game"}>
      <header className={"menu"}>
        <div className={"menu-h"}>
          <div className={"menu-v"}>
            <h4 className={"menu-text"}>Welcome</h4>
            {game.userName
                ? <h2 className={"menu-text info"}>{game.userName}</h2>
                : <h2 className={"menu-text warn"}>No User Name!</h2>}
          </div>
          <div className={"menu-v"}>
            <h4 className={"menu-text"}>Room Code</h4>
            {game.id
                ? <h2 className={"menu-text info"}>{game.id}</h2>
                : <h2 className={"menu-text warn"}>No Game ID!</h2>}
          </div>
          <div className={"menu-v"}>
            <h4 className={"menu-text"}>Game Type</h4>
            {game.gameType
                ? <h2 className={"menu-text info"}>{game.gameType}</h2>
                : <h2 className={"menu-text warn"}>No Game Type!</h2>}
          </div>
        </div>
        <EndGameContext.Consumer>{
          ({endGame}) => <button className={"menu-button"}
                                 onClick={() => {
                                   (isOwner ? deleteGame() : exitGame()).then(endGame)
                                 }}>
            {isOwner ? "End Game" : "Exit Game"}
          </button>
        }</EndGameContext.Consumer>
      </header>

      {game.started
          ? <>
            <div className={"card-deck"}>
              <h2>Your Cards</h2>
              <ul className={"cards"}>
                {game.hand.map(card => <Card key={card.number + card.suit} card={card}/>)}
              </ul>
            </div>
          </>
          : <>
            <div className={"container"}>
              <div className={"container-child"}>
                <h2>Players</h2>
                <ul className={"players"}>
                  {game.players.map(player => <li key={player}>
                    {player + (player === game.owner ? " (host)" : player === game.userName ? " (you)" : "")}
                  </li>)}
                </ul>
                {isOwner
                    ? <button className={"container-button"} onClick={startGame}>Everyone Joined?</button>
                    : <label>Waiting for host...</label>}
              </div>
            </div>
          </>}
    </div>
  </>
}