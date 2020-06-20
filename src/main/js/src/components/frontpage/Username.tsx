import {NameInputContext} from "../../common/contexts";
import React from "react";
import Input from "./Input";

export default function Username() {
  return <>
    <NameInputContext.Consumer>{
      ({setJoinGameName, joinGameName}) =>
          <Input maxLength={10}
                 onChange={setJoinGameName}
                 value={joinGameName}
                 placeholder={"USERNAME"}/>
    }</NameInputContext.Consumer>
  </>
}