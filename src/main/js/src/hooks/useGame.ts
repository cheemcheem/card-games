import {useContext, useEffect, useState} from "react";
import {getGame, getHand} from "../utilities/communication";
import {CardType, Game} from "../common/types";
import {EndGameContext} from "../common/contexts";

export default function useGame() {

  const [game, setGame] = useState(undefined as undefined | Game)
  const [hand, setHand] = useState([] as CardType[]);
  const endGameContext = useContext(EndGameContext);

  useEffect(() => {
    getHand().then(setHand).catch(_ => {});
  }, [endGameContext.endGame])

  useEffect(() => {
    getGame().then(setGame).catch(endGameContext.endGame);
  }, [endGameContext.endGame])


  useEffect(() => {
    let cancelTimeout = undefined;

    if (game) {
      const heartbeat = () => {
        const currentTimeout = setTimeout(() => {
          getHand()
          .then(setHand)
          .catch(_ => {
          });

          getGame()
          .then(setGame)
          .catch(endGameContext.endGame);
        }, 5000);
        cancelTimeout = () => clearTimeout(currentTimeout);
      }
      heartbeat();
    }
    return cancelTimeout;

  }, [game, endGameContext.endGame])


  if (game) {
    return {hand, ...game};
  }
  return undefined;
}