import React, {useEffect, useState} from 'react';
import './App.css';

export default function App() {
  const [test, setTest] = useState("Waiting...");

  useEffect(() => {
    const set = () => {
      if (test === "Waiting...") {
        setTimeout(() => fetch("/api/game/new").then(resp => resp.text()).then(setTest).then(set), 1000);
      }
    }

    set();

  }, [test]);

  return <>
    <div>
      <h1>Status is: {test}</h1>
    </div>
  </>;
}
