import { useState } from 'react';

function CalculatorOpt() {
    const [ans, setAns] = useState("");

    function handleInput(value) {
        // Prevent consecutive operators and restrict starting input with an operator
        if (
            (["+", "-", "*", "/"].includes(value) && ans === "") ||
            (["+", "-", "*", "/"].includes(value) && ["+", "-", "*", "/"].includes(ans.slice(-1)))
        ) {
            return;
        }
        setAns(ans + value); // Append input to the answer
    }

    function handleEqual() {
        try {
            // Evaluate expression safely and set answer
            const result = eval(ans); // eval can be used cautiously here
            setAns(String(result));
        } catch (error) {
            setAns("Error"); // Show error for invalid expressions
        }
    }

    function handleReset() {
        setAns("");
    }

    return (
        <>
            <h2>{ans || "0"}</h2>
            <div className="buttons">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "+", "-", "*", "/"].map((btn) => (
                    <button key={btn} onClick={() => handleInput(btn)}>
                        {btn}
                    </button>
                ))}
                <button onClick={handleEqual}>=</button>
                <button onClick={handleReset}>Res</button>
            </div>
        </>
    );
}


export default CalculatorOpt;