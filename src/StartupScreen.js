import React, { useState } from 'react';

const StartupScreen = ({ onStart }) => {
  const [numProcesses, setNumProcesses] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(numProcesses, 10);
    if (num > 0) {
      onStart(num);
    } else {
      alert('Please enter a valid number of processes.');
    }
  };

  return (
    <div>
      <h1>Welcome to the FCFS Simulator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="numProcesses">Enter the number of processes:</label>
        <input
          type="number"
          id="numProcesses"
          value={numProcesses}
          onChange={(e) => setNumProcesses(e.target.value)}
          required
        />
        <button type="submit">Start</button>
      </form>
    </div>
  );
};

export default StartupScreen;
