import {useEffect, useState} from "react";
import {getGameStaticDetails} from "../utilities/communication";
import {GameStaticDetails} from "../common/types";

export default function useStaticGameDetails({endGame}: { endGame: () => void }): GameStaticDetails | undefined {

  const [staticGameDetails, setStaticGameDetails] = useState(undefined as undefined | GameStaticDetails);

  useEffect(() => {
    getGameStaticDetails()
    .then(setStaticGameDetails)
    .catch(endGame);
  }, [endGame])

  useEffect(() => {
    let cancelTimeout = undefined;

    if (!staticGameDetails) {
      const heartbeat = () => {
        const currentTimeout = setTimeout(() => {
          getGameStaticDetails()
          .then(setStaticGameDetails)
          .then(heartbeat)
          .catch(endGame);
        }, 1000);
        cancelTimeout = () => clearTimeout(currentTimeout);
      }
      heartbeat();
    }

    return cancelTimeout;
  }, [staticGameDetails, endGame])


  return staticGameDetails;
}
