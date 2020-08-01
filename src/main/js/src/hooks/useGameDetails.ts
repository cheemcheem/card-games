import {useEffect, useState} from "react";
import {getGameDetails} from "../utilities/communication";
import {GameDetails} from "../common/types";

export default function useGameDetails({endGame}: { endGame: () => void }): GameDetails {

  const [gameDetails, setGameDetails] = useState({started: false, players: ["test"]} as GameDetails)

  useEffect(() => {
    let cancelTimeout: any;
    let currentTimeout: any;

    const setGameDetailsNoMutate = (newGameDetails: GameDetails) => {
      if (newGameDetails.players.length !== gameDetails.players.length) {
        setGameDetails(newGameDetails);
        return;
      }
      for (let i = 0; i < gameDetails.players.length; i++) {
        if (gameDetails.players[i] !== newGameDetails.players[i]) {
          setGameDetails(newGameDetails);
          return;
        }
      }
      if (gameDetails.started === newGameDetails.started) {
        return;
      }
      setGameDetails({started: newGameDetails.started, players: gameDetails.players});
    }

    const heartbeat = () => {
      currentTimeout = setTimeout(() => {
        getGameDetails()
        .then(setGameDetailsNoMutate)
        .then(heartbeat)
        .catch(endGame);
      }, 1000);
      cancelTimeout = () => clearTimeout(currentTimeout);
    }
    heartbeat();
    return cancelTimeout;
  }, [endGame, gameDetails, setGameDetails])


  return gameDetails;

}