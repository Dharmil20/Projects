import { useState, useEffect } from 'react';
import '../calc.css';

function CalculatorFinal() {
    const [input, setInput] = useState("");

    const handleInput = (value) => {
        if (
            (["+", "*", "/"].includes(value) && input === "") ||  //This ensures operator cannot be first input
            (["+", "-", "*", "/"].includes(value) && ["+", "-", "*", "/"].includes(input.slice(-1))) //This Ensures operator cannot be last
        ) {
            return;
        }
        setInput(input + value);
    };

    const handleEqual = () => {
        try {
            const result = eval(input);
            setInput(String(result));
        } catch (error) {
            setInput("Error");
        }
    };

    const handleClear = () => {
        setInput("");
    };

    const handleBackspace = () => {
        setInput(input.slice(0, -1));
    };

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
    }, [input]);

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

export default CalculatorFinal;
