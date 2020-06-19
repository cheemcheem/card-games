import React, {useEffect, useState} from "react";
import {CardType, Game} from "../common/types";
import {deleteGame, exitGame, getGame, getHand} from "../utilities/communication";
import './GameScene.css';
import Card from "./subcomponents/Card";

export default function GameScene(props: { endGame: () => any }) {

  const [hand, setHand] = useState([] as CardType[]);
  useEffect(() => {
    getHand().then(setHand).catch(props.endGame);
  }, [props.endGame])

  const [game, setGame] = useState(undefined as undefined | Game)
  useEffect(() => {
    getGame().then(setGame).catch(props.endGame);
  }, [props.endGame])

  return <>
    {game
        ? <>
          <div className={"game"}>
            <header className={"menu"}>
              <h1 className={"menu-text"}>Room Code: {game.id}</h1>
              <button className={"menu-button"}
                  onClick={() => {
                    const isOwner = game.isOwner;
                    setGame(undefined);
                    (isOwner ? deleteGame() : exitGame()).then(props.endGame)
                  }}>
                {game.isOwner ? "End Game" : "Exit Game"}
              </button>
            </header>

           <div className={"card-deck"}>
             <ul className={"cards"}>
               {hand.map(card => <Card key={card.number + card.suit} card={card}/>)}
             </ul>
           </div>
          </div>

        </>
        : <>

        </>

    }
  </>
}