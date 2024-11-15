import { useState, useEffect } from 'react';
import '../calc.css';

function CalculatorGPT() {
  const [input, setInput] = useState("");

  // Handle button clicks and keyboard input
  const handleInput = (value) => {
    // Prevent consecutive operators or starting with an operator
    if (
      (["+", "-", "*", "/"].includes(value) && input === "") ||
      (["+", "-", "*", "/"].includes(value) && ["+", "-", "*", "/"].includes(input.slice(-1)))
    ) {
      return;
    }
    setInput(input + value); // Append the value to the current input
  };

  const handleEqual = () => {
    try {
      const result = eval(input); // Evaluate the expression
      setInput(String(result));
    } catch (error) {
      setInput("Error");
    }
  };

  const handleClear = () => {
    setInput("");
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1)); // Remove the last character
  };

  // Add keyboard input handling
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.key >= "0" && e.key <= "9") || ["+", "-", "*", "/"].includes(e.key)) {
        handleInput(e.key);
      } else if (e.key === "Enter") {
        handleEqual();
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key === "Escape") {
        handleClear();
      } else if (e.key === ".") {
        handleInput(".");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]); // Add input as a dependency to keep the listener updated

  return (
    <div className="calculator">
      <h2>Simple Calculator</h2>
      <div className="display">{input || "0"}</div>
      <div className="buttons">
        <button onClick={handleClear}>C</button>
        <button onClick={handleBackspace}>⌫</button>
        <button onClick={() => handleInput("/")}>/</button>
        <button onClick={() => handleInput("*")}>*</button>

        <button onClick={() => handleInput("7")}>7</button>
        <button onClick={() => handleInput("8")}>8</button>
        <button onClick={() => handleInput("9")}>9</button>
        <button onClick={() => handleInput("-")}>-</button>

        <button onClick={() => handleInput("4")}>4</button>
        <button onClick={() => handleInput("5")}>5</button>
        <button onClick={() => handleInput("6")}>6</button>
        <button onClick={() => handleInput("+")}>+</button>

        <button onClick={() => handleInput("1")}>1</button>
        <button onClick={() => handleInput("2")}>2</button>
        <button onClick={() => handleInput("3")}>3</button>
        <button onClick={handleEqual}>=</button>

        <button onClick={() => handleInput(".")}>.</button>
        <button onClick={() => handleInput("0")}>0</button>
      </div>
    </div>
  );
}

export default CalculatorGPT;
