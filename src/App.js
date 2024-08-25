import React, { useState, useRef } from "react";
import styled from "styled-components";

const getBackgroundColor = (state) => {
  switch (state) {
    case "waiting":
      return "aqua";
    case "ready":
      return "red";
    case "now":
      return "#abf023";
    default:
      return "#ddd";
  }
};
const Screen = styled.div`
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
  background-color: ${(props) => getBackgroundColor(props.state)};
`;

const App = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("버튼을 눌러주세요");
  const [result, setResult] = useState([]);

  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요");

      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      clearTimeout(timeout.current);
      setState("waiting");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요");
    } else if (state === "now") {
      endTime.current = new Date();
      setState("waiting");
      setMessage("클릭해서 시작하세요");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };
  const onReset = () => {
    setResult([]);
  };
  return (
    <>
      <Screen state={state} onClick={onClickScreen}>
        {message}
      </Screen>
      {result.length === 0 ? null : (
        <div>
          평균시간:
          {result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
      )}
      <button onClick={onReset}>리셋</button>
    </>
  );
};

export default App;
