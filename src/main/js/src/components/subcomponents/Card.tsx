import {CardColours, CardSymbols, CardType} from "../../common/types";
import React from "react";
import './Card.css';

export default function Card(props: { card: CardType }) {
  return <>
    <li className={`card ${CardColours.get(props.card.suit)}`}
        key={props.card.number + props.card.suit}>
      <div className={"card-number"}>
        <h2>{props.card.number}</h2>
        <small>{CardSymbols.get(props.card.suit)}</small>
      </div>
      <h1 className={`card-suit ${CardColours.get(props.card.suit)}`}>
        {CardSymbols.get(props.card.suit)}
      </h1>
    </li>
  </>
}