import React, {useEffect, useState} from "react";
import {getGameTypes} from "../utilities/communication";
import useSaveState from "./useSaveState";

export default function useGameTypes(): [string[], string, React.Dispatch<React.SetStateAction<string>>] {
  const [gameTypes, setGameTypes] = useState([] as string[]);
  const [gameType, setGameType] = useSaveState("", "gameType");

  useEffect(() => {
    getGameTypes().then(setGameTypes)
  }, [setGameTypes]);

  useEffect(() => {
    if (gameTypes.length > 0 && !gameTypes.includes(gameType)) {
      setGameType(gameTypes[0]);
    }
  }, [gameTypes, gameType, setGameType])

  return [gameTypes, gameType, setGameType];
}