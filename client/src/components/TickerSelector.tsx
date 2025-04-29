import React, { useState } from "react";

interface TickerSelectorProps {
  onTickerSelect: (ticker: string) => void;
}

const TickerSelector: React.FC<TickerSelectorProps> = ({ onTickerSelect }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event?.target.value);
    console.log("Input value changed:", event.target.value);
    // TODO trigger suggestion fetching here
  };

  const handleSubmitTicker = () => {
    if (inputValue.trim()) {
      onTickerSelect(inputValue.trim());
      console.log("Ticker Submitted: ", inputValue.trim());
      // clear input value after submission:
      setInputValue("");
    } else {
      console.log("Ticker field empty, cannot submit.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmitTicker();
    }
  };

  return (
    <div>
      <label htmlFor="tickerInput">Ticker:</label>{" "}
      <input
        type="text"
        id="tickerInput"
        placeholder="Enter ticker symbol"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmitTicker}>Fetch Ticker Data</button>
    </div>
  );
};

export default TickerSelector;
