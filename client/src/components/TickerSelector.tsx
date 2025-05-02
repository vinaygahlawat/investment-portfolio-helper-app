import React, { useEffect, useRef, useState } from "react";

interface TickerSelectorProps {
  onTickerSelect: (ticker: string) => void;
}

interface Suggestion {
  symbol: string;
  company_name: string;
}
const TickerSelector: React.FC<TickerSelectorProps> = ({ onTickerSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const suggestionsListRef = useRef<HTMLUListElement | null>(null);

  // TODO remove
  const hardcodedTickers: Suggestion[] = [
    { symbol: "AAPL", company_name: "Apple Inc." },
    { symbol: "GOOGL", company_name: "Alphabet Inc. (Class A)" },
    { symbol: "GOOG", company_name: "Alphabet Inc. (Class C)" },
    { symbol: "MSFT", company_name: "Microsoft Corporation" },
    { symbol: "AMZN", company_name: "Amazon.com, Inc." },
    { symbol: "TSLA", company_name: "Tesla, Inc." },
    { symbol: "NVDA", company_name: "NVIDIA Corporation" },
    { symbol: "BRK.A", company_name: "Berkshire Hathaway Inc. (Class A)" },
    { symbol: "BRK.B", company_name: "Berkshire Hathaway Inc. (Class B)" },
    { symbol: "JPM", company_name: "JPMorgan Chase & Co." },
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target.value;
    setInputValue(value);
    console.log("Input value changed:", value);
    setActiveSuggestionIndex(-1);
    // TODO trigger suggestion fetching here
    if (value.length > 0) {
      const filteredSuggestions = hardcodedTickers.filter(
        (suggestion) =>
          suggestion.symbol.toLowerCase().startsWith(value.toLowerCase()) ||
          suggestion.company_name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.symbol);
    setShowSuggestions(false);
    onTickerSelect(suggestion.symbol);
    setActiveSuggestionIndex(-1);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onTickerSelect(inputValue.trim().toUpperCase());
      console.log("Ticker Submitted: ", inputValue.trim().toUpperCase());
      setInputValue("");
    } else {
      console.log("Ticker field empty, cannot submit.");
    }
    setSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions && suggestions.length > 0) {
      if (event.key === "ArrowDown") {
        setActiveSuggestionIndex(
          (prevIndex) => (prevIndex + 1) % suggestions.length
        );
      } else if (event.key === "ArrowUp") {
        setActiveSuggestionIndex(
          (prevIndex) =>
            (prevIndex - 1 + suggestions.length) % suggestions.length
        );
      } else if (event.key === "Enter" && activeSuggestionIndex >= 0) {
        handleSuggestionClick(suggestions[activeSuggestionIndex]);
      }
    }
  };

  useEffect(() => {
    if (suggestionsListRef.current && activeSuggestionIndex >= 0) {
      const activeItem =
        suggestionsListRef.current.children[activeSuggestionIndex];
      if (activeItem) {
        activeItem.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeSuggestionIndex, suggestions]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter stock ticker symbol"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul
          ref={suggestionsListRef}
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
            border: "1px solid #ccc",
            position: "absolute",
            backgroundColor: "white",
            zIndex: 10,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor:
                  index === activeSuggestionIndex ? "#f0f0f0" : "white",
              }}
            >
              {suggestion.symbol} : {suggestion.company_name}
            </li>
          ))}
        </ul>
      )}
      <button type="submit">Fetch Data</button>
    </form>
  );
};

export default TickerSelector;
