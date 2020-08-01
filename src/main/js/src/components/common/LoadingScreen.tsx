import React from "react";
import ReactLoading from "react-loading";

export default function LoadingScreen({showLoadingScreen, children}: React.PropsWithChildren<{ showLoadingScreen?: string }>) {
  if (showLoadingScreen) {
    const headerColour = getComputedStyle(document.getElementById("root")!).getPropertyValue('--header-color');
    return <div className={"container container-centered"}>
      <h1>{showLoadingScreen}</h1>
      <ReactLoading type={"cylon"} color={headerColour}/>
    </div>
  }

  return children as React.ReactElement;
}