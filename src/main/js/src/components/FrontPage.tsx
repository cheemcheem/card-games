import React from "react";
import './FrontPage.css';
import Form from "./frontpage/Form";
import Username from "./frontpage/Username";
import RoomCode from "./frontpage/RoomCode";
import SubmitButton from "./frontpage/SubmitButton";
import {FormInputEnabledContext} from "../common/contexts";
import GameDropDown from "./frontpage/GameDropDown";
import ErrorBoundary from "./error/ErrorBoundary";


export default function FrontPage(props: {
  clickNewGame: () => void,
  clickJoinGame: () => void
}) {

  return <FrontPageErrorBoundary>
    <header className={"menu"}>
      <h1 className={"menu-text"}>Welcome to cards.</h1>
    </header>
    <div className={"container"}>
      <FormInputEnabledContext.Consumer>{({enabled}) =>
          enabled ? <></> : <h2 className={"menu-text warn"}>Experiencing connection issues...</h2>
      }</FormInputEnabledContext.Consumer>
      <Form submitAction={props.clickNewGame}>
        <GameDropDown/>
        <Username/>
        <SubmitButton value={"Start new game"}/>
      </Form>
      <h1>OR</h1>
      <Form submitAction={props.clickJoinGame}>
        <RoomCode/>
        <Username/>
        <SubmitButton value={"Join an existing game"}/>
      </Form>
    </div>
  </FrontPageErrorBoundary>
}

function FrontPageErrorBoundary(props: React.PropsWithChildren<any>) {
  const renderError = <>
    <div className={"game"}>
      <header className={"menu"}>
        <h2>{'\u00A0'}</h2>
      </header>
      <div className={"container"}>
        <h2 className={"warn"}>Something went wrong.</h2>
      </div>
    </div>
  </>;
  return <ErrorBoundary renderError={renderError}>{props.children}</ErrorBoundary>
}
