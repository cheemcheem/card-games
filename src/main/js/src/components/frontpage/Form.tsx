import React, {PropsWithChildren} from "react";
import {FormInputEnabledContext} from "../../common/contexts";


const onSubmit = (enabled: boolean, submitAction: () => void) => (ev: React.FormEvent<HTMLFormElement>) => {
  if (enabled) {
    // submit action when enabled only
    submitAction();
  }

  // prevent form submit from reloading page
  ev.preventDefault();

  // prevent form submit from adding a question mark to end of page
  window.history.replaceState({}, document.title, "")
};

export default function Form(props: { submitAction: () => void } & PropsWithChildren<any>) {
  return <FormInputEnabledContext.Consumer>{({enabled}) => <>
    <form className={"container-child"} onSubmit={onSubmit(enabled, props.submitAction)}>
      {props.children}
    </form>
  </>}</FormInputEnabledContext.Consumer>
}