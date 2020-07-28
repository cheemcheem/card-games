import {startGame} from "../../utilities/communication";
import React from "react";
import {Game} from "../../common/types";

export default function GameLobby({game}: {game: Game}) {
  return <>
    <div className={"container"}>
      <div className={"container-child"}>
        <h2>Players</h2>
        <ul className={"players"}>
          {game.players.map(player => <li key={player}>
            {player + (player === game.owner ? " (host)" : player === game.userName ? " (you)" : "")}
          </li>)}
        </ul>
        {(game.owner === game.userName)
            ? <button className={"container-button"} onClick={startGame}>Everyone Joined?</button>
            : <label>Waiting for host...</label>}
      </div>
    </div>
    </>
}