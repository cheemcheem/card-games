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
    if (loggedIn) {
      const heartbeat = () => {
        setTimeout(() => {
          authenticate().then(status => status ? heartbeat() : setLoggedIn(false))
        }, 5000);
      }
      heartbeat();
    }
  }, [loggedIn])
  return loggedIn;
}