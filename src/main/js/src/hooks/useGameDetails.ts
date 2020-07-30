import {useEffect, useState} from "react";
import {getGameDetails} from "../utilities/communication";
import {GameDetails} from "../common/types";

export default function useGameDetails({endGame}: { endGame: () => void }): GameDetails | undefined {

  const [gameDetails, setGameDetails] = useState(undefined as undefined | GameDetails)

  useEffect(() => {
    getGameDetails()
    .then(setGameDetails)
    .catch(endGame);
  }, [endGame])

  useEffect(() => {
    let cancelTimeout = undefined;

    const heartbeat = () => {
      const currentTimeout = setTimeout(() => {
        getGameDetails()
        .then(setGameDetails)
        .then(heartbeat)
        .catch(endGame);
      }, 1000);
      cancelTimeout = () => clearTimeout(currentTimeout);
    }
    heartbeat();

    return cancelTimeout;
  }, [endGame])


  return gameDetails;

}