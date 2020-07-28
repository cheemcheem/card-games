import React from "react";
import {FormInputEnabledContext} from "../../common/contexts";

const handleEventChange = (handler: (value: string) => void) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => handler(event.target.value);

export default function DropDown(props: { onChange: (value: string) => void, value: string, children: React.PropsWithChildren<any> }) {
  return <FormInputEnabledContext.Consumer>{({enabled}) =>
      <select
          className={"container-text mono"}
          onChange={handleEventChange(props.onChange)}
          required
          value={props.value}
          disabled={!enabled}>
        {props.children}
      </select>
  }</FormInputEnabledContext.Consumer>
}