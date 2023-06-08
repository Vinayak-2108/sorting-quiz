import React, { useState, useEffect } from "react";

const App = () => {
    const [values, setValues] = useState([]);
    const [sortedValues, setSortedValues] = useState([]);
    const [inputId, setId] = useState("");
    const [userInput, setUserInput] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);

    // Generate random values
    const generateRandomValues = () => {
        const randomValues = Array.from({ length: 5 }, () =>
            Math.floor(Math.random() * 100)
        );
        setValues(randomValues);
        setSortedValues([...randomValues].sort((a, b) => a - b));
        setUserInput(Array.from({ length: 5 }, () => null));
        setIsCorrect("");
    };

    useEffect(() => {
        generateRandomValues();
    }, []);

    // Handle drag start event
    const handleInputDragStart = (event, value, index) => {
        event.dataTransfer.setData("text/plain", value);
        event.dataTransfer.effectAllowed = "move";
    };
    const handleValuesDragStart = (event, value, index) => {
        event.dataTransfer.setData("text/plain", value);
        event.dataTransfer.effectAllowed = "move";
    };

    // Handle drag over event
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    // Handle drop event
    const handleDrop = (event, index) => {
        event.preventDefault();
        const value = event.dataTransfer.getData("text/plain");
        const newInput = [...userInput];
        newInput[index] = parseInt(value);
        const remainingValues = values.filter(
            (item) => item !== parseInt(value)
        );
        setUserInput(newInput);
        setValues(remainingValues);
    };

    const handleReverseDrop = (event) => {

      {isIdSame && {}}
        event.preventDefault();
        const value = event.dataTransfer.getData("text/plain");

        const newValue = [...values];
        newValue.push(value);
        const input = [...userInput];
        const newInput = input.map((element) => {
            if (element === parseInt(value)) {
                return null;
            }
            return element;
        });
        console.log(newInput);
        setValues(newValue);
        setUserInput(newInput);
        console.log(value);
    };

    // Remove value from input and put it back to the list
    const handleRemoveValue = (index) => {
        const removedValue = userInput[index];
        const newInput = [...userInput];
        newInput[index] = null;
        setUserInput(newInput);
        setValues([...values, removedValue]);
    };

    // Check the answer
    const checkAnswer = () => {
        const isCorrectAnswer = userInput.every(
            (value, index) => value === sortedValues[index]
        );
        isCorrectAnswer ? setIsCorrect("true") : setIsCorrect("false");
    };

    const isAllFilled = userInput.every((value) => value !== null);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">Drag and drop here</h2>
                <div id="input" className="flex">
                    {userInput.map((value, index) => (
                        <div
                            key={index}
                            draggable
                            id="userInput"
                            className="w-12 h-12 bg-blue-200 flex items-center border-dotted border-blue-500 border-2 justify-center mr-2 rounded"
                            onDragOver={handleDragOver}
                            onDrop={(event) => handleDrop(event, index)}
                            onDragStart={(event) =>
                                handleInputDragStart(event, value)
                            }
                        >
                            {value !== null ? value : ""}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="text-xl font-bold mb-2">Sort the values</h2>
                <div
                    id="values"
                    onDrop={(event) => handleReverseDrop(event)}
                    onDragOver={handleDragOver}
                    className="flex justify-center rounded-lg border-dotted border-2 p-2 pr-0 min-w-[50%] min-h-[50%]"
                >
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="w-12 h-12 bg-gray-200 flex items-center justify-center mr-2 rounded"
                            draggable
                            onDragStart={(event) =>
                                handleValuesDragStart(event, value, index)
                            }
                            onDragExit={() => {}}
                        >
                            {value}
                        </div>
                    ))}
                </div>
            </div>
            {isAllFilled ? (
                <button
                    className={`mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded`}
                    onClick={checkAnswer}
                    disabled={!isAllFilled}
                >
                    Check
                </button>
            ) : (
                <button
                    className={`mt-4 px-4 py-2 bg-gray-500 text-white rounded`}
                    onClick={checkAnswer}
                    disabled={!isAllFilled}
                >
                    Check
                </button>
            )}
            {isCorrect == "true" && (
                <p className="text-green-500 font-bold mt-2">Correct answer!</p>
            )}
            {isCorrect == "false" && (
                <p className="text-red-500 font-bold mt-2">
                    Wrong answer. Please try again.
                </p>
            )}
            <button
                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={generateRandomValues}
            >
                Reset
            </button>
        </div>
    );
};

export default App;
