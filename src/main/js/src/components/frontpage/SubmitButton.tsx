import React from "react";
import {FormInputEnabledContext} from "../../common/contexts";

export default function SubmitButton(props: { value: string }) {
  return <FormInputEnabledContext.Consumer>{({enabled}) =>
      <input className={"container-button"} type={"submit"} value={props.value} disabled={!enabled}/>
  }</FormInputEnabledContext.Consumer>

}