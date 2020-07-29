import {useContext, useEffect, useState} from "react";
import {getGameDetails} from "../utilities/communication";
import {GameDetails} from "../common/types";
import {EndGameContext} from "../common/contexts";

export default function useGameDetails(): GameDetails | undefined {

  const [gameDetails, setGameDetails] = useState(undefined as undefined | GameDetails)
  const endGameContext = useContext(EndGameContext);

  useEffect(() => {
    getGameDetails()
    .then(setGameDetails)
    .catch(endGameContext.endGame);
  }, [endGameContext.endGame])

  useEffect(() => {
    let cancelTimeout = undefined;

    const heartbeat = () => {
      const currentTimeout = setTimeout(() => {
        getGameDetails()
        .then(setGameDetails)
        .then(heartbeat)
        .catch(endGameContext.endGame);
      }, 1000);
      cancelTimeout = () => clearTimeout(currentTimeout);
    }
    heartbeat();

    return cancelTimeout;
  }, [endGameContext.endGame])


  return gameDetails;

}