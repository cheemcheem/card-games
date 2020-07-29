import {EndGameContext} from "../../common/contexts";
import {deleteGame, exitGame} from "../../utilities/communication";
import React from "react";
import {GameStaticDetails} from "../../common/types";

export default function GameMenu({game}: { game: GameStaticDetails }) {

  return <>
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
                                 ((game.owner === game.userName) ? deleteGame() : exitGame()).then(endGame)
                               }}>
          {(game.owner === game.userName) ? "End Game" : "Exit Game"}
        </button>
      }</EndGameContext.Consumer>
    </header>
  </>
}