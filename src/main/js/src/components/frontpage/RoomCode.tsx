import {RoomCodeInputContext} from "../../common/contexts";
import React from "react";
import Input from "./Input";

export default function RoomCode() {
  return <>
    <RoomCodeInputContext.Consumer>{
      ({setJoinGameId, joinGameId}) =>
          <Input maxLength={4}
                 onChange={setJoinGameId}
                 placeholder={"ROOMCODE"}
                 value={joinGameId}
          />
    }</RoomCodeInputContext.Consumer>

  </>
}