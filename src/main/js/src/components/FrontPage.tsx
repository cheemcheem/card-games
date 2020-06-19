import React, {PropsWithChildren} from "react";
import './FrontPage.css';

export default function FrontPage(props: {
  enabled: boolean,
  clickNewGame: () => void,
  setJoinGameId: (id: string) => void,
  setJoinGameName: (name: string) => void,
  clickJoinGame: () => void
}) {

  function Form(props: { submitAction: () => void } & PropsWithChildren<any>) {
    return <form className={"container-child"} onSubmit={ev => {
      props.submitAction(); // trigger fetch to join game server side
      ev.preventDefault(); // prevent form submit from reloading page
      window.history.replaceState({}, document.title, "") // prevent form submit from adding a question mark to end of page
    }}>
      {props.children}
    </form>
  }

  function Username() {
    return <input className={"container-text mono"} type={"text"} maxLength={10}
                  onChange={event => props.setJoinGameName(event.target.value)}
                  placeholder={"USERNAME"} required defaultValue={"test"}/>
  }

  function SubmitButton(props: { value: string }) {
    return <input className={"container-button"} type={"submit"} value={props.value}/>
  }

  return <>
    <header className={"menu"}><h1 className={"menu-text"}>Welcome to cards.</h1></header>
    <div className={"container"}>
      <Form submitAction={props.clickNewGame}>
        <Username/>
        <SubmitButton value={"Start new game"}/>
      </Form>
      <h1>OR</h1>
      <Form submitAction={props.clickJoinGame}>
        <input className={"container-text mono"} type={"text"} maxLength={4}
               onChange={event => props.setJoinGameId(event.target.value)}
               pattern={"([0-9]|[A-Z]){1,4}"}
               placeholder={"ROOMCODE"} required
        />
        <Username/>
        <SubmitButton value={"Join an existing game"}/>
      </Form>
    </div>
  </>
}