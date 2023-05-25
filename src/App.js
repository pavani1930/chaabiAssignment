import React, { useState, useEffect } from 'react';

import "./App.css"

const App = () => {
  const targetKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']; // Target keys for practice
  const [currentKey, setCurrentKey] = useState(targetKeys[0]);
  const [keysPressed, setKeysPressed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      setIsRunning(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleKeyPress = (event) => {
    if (event.key === currentKey) {
      setKeysPressed((prevKeysPressed) => prevKeysPressed + 1);
      setCurrentKey(targetKeys[(keysPressed + 1) % targetKeys.length]);
    } else {
      setAccuracy((prevAccuracy) => ((keysPressed + 1) / prevAccuracy) * 100);
    }
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setCurrentKey(targetKeys[0]);
    setKeysPressed(0);
    setAccuracy(100);
    setTimer(300);
    setIsRunning(false);
  };

  return (
    <div className='main-div'>

<div className='container'>
      <h1>Touch Typing Practice</h1>
      <div>
        <p>Next Key: {currentKey}</p>
        <input type="text" onChange={handleKeyPress} disabled={!isRunning}  />
      </div>
      <div>
        <p>Time Remaining: {timer}s</p>
        <p>Keys Pressed: {keysPressed}</p>
        <p>Accuracy: {accuracy.toFixed(2)}%</p>
      </div>
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
    </div>


  );
};

export default App;