import React from "react";
import {GameTypeInputContext} from "../../common/contexts";
import DropDown from "./DropDown";

export default function GameDropDown() {
  function GameOption(props: {option: string}) {
    return <option key={props.option} value={props.option}>
      {props.option}
    </option>
  }
  return <>
    <GameTypeInputContext.Consumer>{
      ({gameType, setGameType, gameTypes}) =>
          <DropDown value={gameType} onChange={setGameType}>
            <option value={""} key={"default"}>--Choose a game mode--</option>
            {gameTypes.map(potentialGameType => GameOption({option: potentialGameType}))}
          </DropDown>
    }</GameTypeInputContext.Consumer>
  </>
}