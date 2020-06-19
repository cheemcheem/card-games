import {useEffect, useState} from "react";
import {authenticate} from "../utilities/communication";

export default function useLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const attemptLogIn = () => {
      setTimeout(() => {
        authenticate().then(status => status ? setLoggedIn(true) : attemptLogIn())
      }, 1000);
    }
    attemptLogIn();
  }, [loggedIn]);
  return loggedIn;
}