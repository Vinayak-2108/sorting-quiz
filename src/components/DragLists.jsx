import React, { useState, useEffect, useRef } from "react";

export const DragLists = () => {
    const [sortedValues, setSortedValues] = useState([]);
    const [values, setValues] = useState([]);
    const [userInput, setUserInput] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    // useRefs
    const dragItem = useRef();
    const dragNode = useRef();

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
    const handleDragStart = (e, params) => {
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener("dragend", handleDragEnd);
        setTimeout(() => {
            setIsDragging(true);
        }, 0);
    };

    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current;
        const currId = currentItem.id;
        const currIndex = currentItem.index;
        if (params.id === "input") {
            const newInput = [...userInput];
            const newValues = [...values];
            const temp = newInput[params.index];
            newInput[params.index] =
                currId === "input" ? userInput[currIndex] : values[currIndex];
            currId === "input"
                ? (newInput[currIndex] = temp)
                : (newValues[currIndex] = temp);
            const finalValues = newValues.filter((item) => item !== null);
            setUserInput(newInput);
            setValues(finalValues);
        }
        if (params.id === "values") {
            const newInput = [...userInput];
            const newValues = [...values];
            if(currId === "input"){
                (userInput[currIndex]!==null)?newValues.push(userInput[currIndex]):(null);
                newInput[currIndex] = null;
            }
            setUserInput(newInput);
            setValues(newValues);
        }

    };

    // Handle drag over event
    const handleDragOver = (event) => {
        event.preventDefault();
        event.target.classList.add("active");
    };
    
    const handleDragLeave = (event) => {
        event.target.classList.remove("active");

    }

    const handleDragEnd = () => {
        dragNode.current.removeEventListener("dragend", handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
        setIsDragging(false);
    };

    // Check the answer
    const checkAnswer = () => {
        const isCorrectAnswer = userInput.every(
            (value, index) => value === sortedValues[index]
        );
        isCorrectAnswer ? setIsCorrect("true") : setIsCorrect("false");
    };

    const isAllFilled = userInput.every((value) => value !== null);
    const getstyles = (params) => {
        const currentItem = dragItem.current;
        if (
            currentItem.id === params.id &&
            currentItem.index === params.index
        ) {
            return "bg-gray-600";
        }
        return "";
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">Drag and drop here</h2>
                <div id="input" className="flex">
                    {userInput.map((value, index) => (
                        <div
                            key={index}
                            draggable={value!==null}
                            id="userInput"
                            className={`${
                                isDragging && getstyles({ id: "input", index })
                            } w-12 h-12 bg-blue-200 flex items-center border-dotted border-blue-500 border-2 justify-center mr-2 rounded`}
                            onDragOver={(e)=>{handleDragOver(e)}}
                            onDragLeave={(e)=>{handleDragLeave(e)}}
                            onDragStart={(event) =>
                                handleDragStart(event, { id: "input", index })
                            }
                            onDrop={
                                isDragging
                                    ? (e) => {
                                          handleDragEnter(e, {
                                              id: "input",
                                              index,
                                          });
                                      }
                                    : null
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
                    onDragOver={(e)=>{handleDragOver(e)}}
                    onDragLeave={(e)=>{handleDragLeave(e)}}
                    onDrop={isDragging ?(e) => handleDragEnter(e,{id: "values", index: 0}):null}
                    className={`flex justify-center rounded-lg border-dotted border-2 p-2 pr-0 min-w-[50%] min-h-[50%]  cursor-grab`}
                >
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className={`${
                                isDragging && getstyles({ id: "values", index })
                            } w-12 h-12 bg-gray-200 flex items-center justify-center mr-2 rounded`}
                            draggable
                            onDragStart={(event) =>
                                handleDragStart(event, { id: "values", index })
                            }
                            onDrop={
                                isDragging
                                    ? (e) => {
                                          handleDragEnter(e, {
                                              id: "values",
                                              index,
                                          });
                                      }
                                    : null
                            }
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
