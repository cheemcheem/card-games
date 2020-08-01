import ReactLoading from "react-loading";
import React from "react";

export default function GameMenuVertical({text, header}: { text?: string, header: string }) {

  const headerHeight = getComputedStyle(document.getElementById("root")!).getPropertyValue('--bigger-font-size');
  const headerColour = getComputedStyle(document.getElementById("root")!).getPropertyValue('--main-bg-color');

  return <div className={"menu-v"}>
    <h4 className={"menu-text"}>{header}</h4>
    {text
        ? <h2 className={"menu-text info"}>{text}</h2>
        : <h2 className={"menu-text"}>
          <ReactLoading type={"spin"} color={headerColour} width={headerHeight} height={headerHeight}/>
        </h2>}
  </div>;
}