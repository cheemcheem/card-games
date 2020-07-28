import {useEffect, useState} from "react";
import {authenticate} from "../utilities/communication";

export default function useLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    let initialDelay = 1;
    const attemptLogIn = () => {
      setTimeout(() => {
        authenticate().then(status => status ? setLoggedIn(true) : attemptLogIn())
      }, Math.min(initialDelay *= 2, 10000));
    }
    attemptLogIn();
  }, [loggedIn]);

  useEffect(() => {
    let cancelTimeout = undefined;

    if (loggedIn) {
      const heartbeat = () => {
        const currentTimeout = setTimeout(() => {
          authenticate().then(status => status ? heartbeat() : setLoggedIn(false))
        }, 5000);
        cancelTimeout = () => clearTimeout(currentTimeout);

      }
      heartbeat();
    }
    return cancelTimeout;

  }, [loggedIn])
  return loggedIn;
}