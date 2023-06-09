import React, { useState, useEffect, useRef } from "react";
import ResultModal from "./ResultModal/ResultModal";
import { motion } from "framer-motion";

export const DragLists = () => {
    // Define states
    const [sortedValues, setSortedValues] = useState([]);
    const [values, setValues] = useState([]);
    const [userInput, setUserInput] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [openModal, setOpenModal] = useState(false);

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
        setOpenModal(false);
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
    // Handle drop event
    const handleDrop = (e, params) => {
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
            if (currId === "input") {
                userInput[currIndex] !== null
                    ? newValues.push(userInput[currIndex])
                    : null;
                newInput[currIndex] = null;
            }
            setUserInput(newInput);
            setValues(newValues);
        }
    };

    // Handle drag over event
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    // Handle drag over event for input list
    const handleDragOverInput = (event) => {
        event.preventDefault();
        event.target.classList.add("active");
    };
    // Handle drag leave event
    const handleDragLeave = (event) => {
        event.target.classList.remove("active");
    };
    // Handle drag end event
    const handleDragEnd = () => {
        dragNode.current.removeEventListener("dragend", handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
        setIsDragging(false);
    };

    // Check the answer
    const checkAnswer = () => {
        setOpenModal(true);
        const isCorrectAnswer = userInput.every(
            (value, index) => value === sortedValues[index]
        );

        isCorrectAnswer ? setIsCorrect("true") : setIsCorrect("false");
    };
    // Check if any input bucket is null
    const isAllFilled = userInput.every((value) => value !== null);
    // Helper function to add styles
    const getstyles = (params) => {
        const currentItem = dragItem.current;
        if (
            currentItem.id === params.id &&
            currentItem.index === params.index
        ) {
            return "bg-gray-500 opacity-30";
        }
        return "";
    };
    return (
        <div className="flex flex-col items-center justify-center h-[80%] w-1/2 glassmorphism cursor-none border-solid border-2 ">
             {/* Input buckets */}
            <div className="mb-8 flex flex-col justify-center items-center">
                <h2 className="text-xl font-bold mb-2 blue_gradient">
                    Sort the list in Ascending order!
                </h2>
                <div id="input" className="flex">
                    {userInput.map((value, index) => (
                        <div
                            key={index}
                            draggable={value !== null}
                            id="userInput"
                            className={`${
                                isDragging && getstyles({ id: "input", index })
                            } w-12 h-12 bg-blue-200 flex items-center border-dotted border-blue-500 border-2 justify-center mr-2 rounded ${
                                value !== null ? "bg-white" : ""
                            }`}
                            onDragOver={(e) => {
                                handleDragOverInput(e);
                            }}
                            onDragLeave={(e) => {
                                handleDragLeave(e);
                            }}
                            onDragStart={(event) =>
                                handleDragStart(event, { id: "input", index })
                            }
                            onDrop={
                                isDragging
                                    ? (e) => {
                                          handleDrop(e, {
                                              id: "input",
                                              index,
                                          });
                                      }
                                    : null
                            }
                        >
                            {value !== null ? value : "Drop"}
                        </div>
                    ))}
                </div>
            </div>

            {/* Values to be sorted */}
            <div className="mb-8 flex flex-col justify-between items-center">
               
                <div
                    id="values"
                    onDragOver={(e) => {
                        handleDragOver(e);
                    }}
                    onDragLeave={(e) => {
                        handleDragLeave(e);
                    }}
                    onDrop={
                        isDragging
                            ? (e) =>
                                  handleDrop(e, { id: "values", index: 0 })
                            : null
                    }
                    className={`flex justify-center rounded-lg border-dotted border-2 p-2 pr-0 min-w-[48px] min-h-[48px] `}
                >
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
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
                                          handleDrop(e, {
                                              id: "values",
                                              index,
                                          });
                                      }
                                    : null
                            }
                        >
                            {value}
                        </motion.div>
                    ))}
                </div>
            </div>
            {/* Check button: if all the input buckets are not filled, the button is disabled */}
            {isAllFilled ? (
                <motion.button
                    className={`mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded`}
                    onClick={checkAnswer}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={!isAllFilled}
                >
                    Check
                </motion.button>
            ) : (
                <button
                    className={`mt-4 px-4 py-2 bg-gray-500 text-white rounded`}
                    onClick={checkAnswer}
                    disabled={!isAllFilled}
                >
                    Check
                </button>
            )}
            {/* Result Modal */}
            <ResultModal
                open={openModal}
                onClose={generateRandomValues}
                result={isCorrect}
            />
        </div>
    );
};
