import {useContext, useEffect, useState} from "react";
import {getGameStaticDetails} from "../utilities/communication";
import {GameStaticDetails} from "../common/types";
import {EndGameContext} from "../common/contexts";

export default function useStaticGameDetails(): GameStaticDetails | undefined {

  const [staticGameDetails, setStaticGameDetails] = useState(undefined as undefined | GameStaticDetails);
  const endGameContext = useContext(EndGameContext);

  useEffect(() => {
    getGameStaticDetails()
    .then(setStaticGameDetails)
    .catch(endGameContext.endGame);
  }, [endGameContext.endGame])

  useEffect(() => {
    let cancelTimeout = undefined;

    if (!staticGameDetails) {
      const heartbeat = () => {
        const currentTimeout = setTimeout(() => {
          getGameStaticDetails()
          .then(setStaticGameDetails)
          .then(heartbeat)
          .catch(endGameContext.endGame);
        }, 1000);
        cancelTimeout = () => clearTimeout(currentTimeout);
      }
      heartbeat();
    }

    return cancelTimeout;
  }, [staticGameDetails, endGameContext.endGame])


  return staticGameDetails;
}
