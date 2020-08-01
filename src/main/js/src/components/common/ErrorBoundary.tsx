import React, {ErrorInfo} from "react";
import {log, LogLevel} from "../../utilities/log";

export default class ErrorBoundary extends React.Component<{ renderError: any }, { hasError: boolean }> {
  constructor(props: { renderError: any }) {
    super(props);
    this.state = ({hasError: false})
  }

  static getDerivedStateFromError(error: Error) {
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    log({error, errorInfo}, LogLevel.ERROR);
  }

  render() {
    if (this.state.hasError) {
      return this.props.renderError;
    }
    return this.props.children;
  }
}