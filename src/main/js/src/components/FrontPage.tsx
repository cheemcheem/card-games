import React, {useState} from "react";
import './FrontPage.css';
import Form from "./frontpage/Form";
import Username from "./frontpage/Username";
import RoomCode from "./frontpage/RoomCode";
import SubmitButton from "./frontpage/SubmitButton";
import {FormInputEnabledContext} from "../common/contexts";
import GameDropDown from "./frontpage/GameDropDown";
import ErrorBoundary from "./error/ErrorBoundary";
import ReactLoading from "react-loading";


export default function FrontPage(props: {
  clickNewGame: () => void,
  clickJoinGame: () => void
}) {

  const [showLoadingScreen, setShowLoadingScreen] = useState(undefined as undefined | string);

  const handleClickNewGame = () => {
    setShowLoadingScreen("Creating New Game");
    setTimeout(() => {
      props.clickNewGame();
      setShowLoadingScreen(undefined);
    }, 2000)
    ;
  }

  const handleClickJoinGame = () => {
    setShowLoadingScreen("Joining Game");
    setTimeout(() => {
      props.clickJoinGame();
      setShowLoadingScreen(undefined);
    }, 2000)
    ;
  }

  return <FrontPageErrorBoundary>
    <header className={"menu"}>
      <h1 className={"menu-text"}>Welcome to cards.</h1>
    </header>
    <div className={"container"}>
      {showLoadingScreen
          ? <>
            <h1>{showLoadingScreen}</h1>
            <ReactLoading type={"cylon"}
                          color={getComputedStyle(document.getElementById("root")!).getPropertyValue('--header-color')}/>
          </>
          : <>
            <FormInputEnabledContext.Consumer>{({enabled}) =>
                enabled ? <></> :
                    <h2 className={"menu-text warn"}>Experiencing connection issues...</h2>
            }</FormInputEnabledContext.Consumer>
            <Form submitAction={handleClickNewGame}>
              <GameDropDown/>
              <Username/>
              <SubmitButton value={"Start new game"}/>
            </Form>
            <h1>OR</h1>
            <Form submitAction={handleClickJoinGame}>
              <RoomCode/>
              <Username/>
              <SubmitButton value={"Join an existing game"}/>
            </Form>
          </>}
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
