import React from "react";

export const FormInputEnabledContext = React.createContext({
  enabled: false
});

export const NameInputContext = React.createContext({
  setJoinGameName: (_: string) => {
  },
  joinGameName: ""
})
export const RoomCodeInputContext = React.createContext({
  setJoinGameId: (_: string) => {
  },
  joinGameId: ""
})
export const GameTypeInputContext = React.createContext({
  setGameType: (_: string) => {
  },
  gameTypes: [] as string[],
  gameType: ""
})
export const EndGameContext = React.createContext({
  endGame: () => {}
})
export const StartGameContext = React.createContext({
  startGame: () => {}
})