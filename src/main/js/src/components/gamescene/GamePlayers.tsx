import React from "react";

export default function GamePlayers({players, owner, userName, children}: React.PropsWithChildren<{ players?: string[], owner: string, userName: string }>) {
  return <div className={"container-child"}>
    <h2>Players</h2>
    <ul className={"players"}>
      {players?.map(player => <li key={player}>
        {player + (player === owner ? " (host)" : player === userName ? " (you)" : "")}
      </li>)}
      {children}
    </ul>
  </div>
}