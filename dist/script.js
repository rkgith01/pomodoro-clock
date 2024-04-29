import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import * as React from "https://cdn.skypack.dev/react@17.0.1";

const Pomodoro = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timeLeft, setTimeLeft] = React.useState(1500);
  const [timeLabel, setTimeLabel] = React.useState("New Session");
  const [titleChanged, setTitleChanged] = React.useState(false);
  const [playPomodoro, setPlayPomodoro] = React.useState(false);

  const checkTimeOut = setTimeout(() => {
    if (timeLeft && playPomodoro) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  const increaseBreak = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const decreaseBreak = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementSession = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  const decrementSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const clickReset = () => {
    clearTimeout(checkTimeOut);
    setPlayPomodoro(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLabel("New Session");
    setTitleChanged(false);
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const clickPlay = () => {
    setTitleChanged(true);
    clearTimeout(checkTimeOut);
    setPlayPomodoro(!playPomodoro);
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && timeLabel === "New Session") {
      setTimeLeft(breakLength * 60);
      setTimeLabel("break");
      audio.play();
    }
    if (!timeLeft && timeLabel === "break") {
      setTimeLeft(sessionLength * 60);
      setTimeLabel("New Session");
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const timer = () => {
    playPomodoro ? checkTimeOut && resetTimer() : clearTimeout(checkTimeOut);
  };

  React.useEffect(() => {
    timer();
  }, [playPomodoro, timeLeft, checkTimeOut]);

  const formateTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const mainTitle = timeLabel === "New Session" ? "Session" : "Break";

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("div", { class: "logo" }, /*#__PURE__*/
    React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "256",
      height: "256",
      viewBox: "0 0 100 100" }, /*#__PURE__*/

    React.createElement("rect", { width: "100", height: "100", rx: "20", fill: "#4a90e2" }), /*#__PURE__*/
    React.createElement("path", {
      d: "M40.20 86L40.20 86L24.70 86Q22.80 86 21.95 85.15Q21.10 84.30 21.10 82.40L21.10 82.40L21.10 17.60Q21.10 15.70 21.95 14.85Q22.80 14 24.70 14L24.70 14L55.30 14Q68.90 14 73.90 19.40Q78.90 24.80 78.90 33.50L78.90 33.50L78.90 46.30Q78.90 55 73.90 60.40Q68.90 65.80 55.30 65.80L55.30 65.80L43.80 65.80L43.80 82.40Q43.80 84.30 42.95 85.15Q42.10 86 40.20 86ZM52.60 32.70L43.60 32.70L43.60 47.80L52.60 47.80Q55.50 47.80 56.40 46.30Q57.30 44.80 57.30 42.90L57.30 42.90L57.30 37.60Q57.30 35.70 56.40 34.20Q55.50 32.70 52.60 32.70L52.60 32.70Z",
      fill: "#000000" }))), /*#__PURE__*/



    React.createElement("div", { className: "container" }, /*#__PURE__*/
    React.createElement("h2", { className: titleChanged ? "title-changed" : "" },
    titleChanged ? "Its Pomodoro Time" : "25 + 5 Clock"), /*#__PURE__*/

    React.createElement("div", { className: "length-container" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h3", { id: "session-label" }, "Session Length"), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("button", {
      disabled: playPomodoro,
      onClick: incrementSession,
      id: "session-increment" }, "+"), /*#__PURE__*/



    React.createElement("strong", { id: "session-length" }, sessionLength), /*#__PURE__*/
    React.createElement("button", {
      disabled: playPomodoro,
      onClick: decrementSession,
      id: "session-decrement" }, "-"))), /*#__PURE__*/





    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h3", { id: "break-label" }, "Break Length"), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("button", {
      disabled: playPomodoro,
      onClick: increaseBreak,
      id: "break-increment" }, "+"), /*#__PURE__*/



    React.createElement("strong", { id: "break-length" }, breakLength), /*#__PURE__*/
    React.createElement("button", {
      disabled: playPomodoro,
      onClick: decreaseBreak,
      id: "break-decrement" }, "-")))), /*#__PURE__*/






    React.createElement("div", { className: "clock-wrapper" }, /*#__PURE__*/
    React.createElement("div", { className: "clock" }, /*#__PURE__*/
    React.createElement("h2", { id: "timer-label" }, mainTitle), /*#__PURE__*/
    React.createElement("h3", { id: "time-left" }, formateTime())), /*#__PURE__*/

    React.createElement("button", { onClick: clickPlay, id: "start_stop" }, "Start/Stop"), /*#__PURE__*/


    React.createElement("button", { onClick: clickReset, id: "reset" }, "Reset")), /*#__PURE__*/



    React.createElement("audio", {
      id: "beep",
      preload: "auto",
      src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" }))));




};

ReactDOM.render( /*#__PURE__*/React.createElement(Pomodoro, null), document.getElementById("pomodoro"));