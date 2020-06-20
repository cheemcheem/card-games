import React from "react";
import {FormInputEnabledContext} from "../../common/contexts";

const handleEventChange = (handler: (value: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => handler(event.target.value);

export default function Input(props: { onChange: (value: string) => void, value: string, placeholder: string, maxLength: number}) {
  return <FormInputEnabledContext.Consumer>{({enabled}) =>
      <input
          maxLength={props.maxLength}
          className={"container-text mono"} type={"text"}
          onChange={handleEventChange(props.onChange)}
          placeholder={props.placeholder}
          required
          value={props.value}
          disabled={!enabled}
      />
  }</FormInputEnabledContext.Consumer>
}