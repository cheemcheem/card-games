import {startGame} from "../../utilities/communication";
import React from "react";
import {GameDetails, GameStaticDetails} from "../../common/types";

export default function GameLobby({gameDetails, staticGameDetails}: { gameDetails?: GameDetails, staticGameDetails: GameStaticDetails }) {

  return <>
    <div className={"container"}>
      <div className={"container-child"}>
        <h2>Players</h2>
        <ul className={"players"}>
          {gameDetails?.players.map(player => <li key={player}>
            {player + (player === staticGameDetails.owner ? " (host)" : player === staticGameDetails.userName ? " (you)" : "")}
          </li>)}
        </ul>
        {(staticGameDetails.owner === staticGameDetails.userName)
            ? <button className={"container-button"} onClick={startGame}>Everyone Joined?</button>
            : <label>Waiting for host...</label>}
      </div>
    </div>
  </>
}