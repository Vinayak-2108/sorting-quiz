# Quiz Game

A React application that allows users to sort a set of random values. 

[Deployed Link](https://sorting-quiz.netlify.app/)
## Overview

The Quiz Game consists of the following components:

- **DragLists.jsx**: The main component that manages the state and handles the logic of the quiz game.
- **RandomValues.js**: A component that displays the randomly generated values for the user to sort.
- **UserInput.js**: A component that displays the user's input fields where they can drop the numbers and sort them.
- **ResultModal.js**: A modal component that shows the result of the quiz game.

## How It Works

### DragLists
1. When the Quiz Game starts, the `generateRandomValues` function is called to generate an array of 5 random values. The `values` state is updated with the generated values, and the `sortedValues` state is updated with the sorted version of the values.

2. The `handleDragStart` function is triggered when a user starts dragging a number from the random values list. It sets the `dragItem` and `dragNode` refs to the current dragged item and target element, respectively. It also adds an event listener for the drag end event.

3. The `handleDrop` function is triggered when a dragged item is dropped on a target (input field or random values list). It updates the `userInput` and `values` arrays based on the current dragged item and drop target.

4. The `handleDragOver` function is triggered when a dragged item is being dragged over a drop target. It prevents the default behavior of the dragover event.

5. The `handleDragOverInput` function is triggered when a dragged item is being dragged over an input field. It prevents the default behavior of the dragover event and adds the "active" class to the target element.

6. The `handleDragLeave` function is triggered when a dragged item leaves a drop target. It removes the "active" class from the target element.

7. The `handleDragEnd` function is triggered when the drag operation ends. It removes the event listener, resets the `dragItem` and `dragNode` refs, and sets the `isDragging` state to `false`.

8. When the user clicks the check button, the `checkAnswer` function is called. It compares each value in the `userInput` array with the corresponding value in the `sortedValues` array using the `every()` method. If all the values match, the `isCorrect` state is set to `true`, indicating that the user's answer is correct. Otherwise, it is set to `false`.

9. The `ResultModal` component is rendered to show the result of the quiz game. It displays a success or failure message based on the `isCorrect` state.

## Key Features

### Animation with Framer Motion

The Quiz Game utilizes the [Framer Motion](https://www.framer.com/api/motion/) library to create smooth and engaging animations. The `ResultModal` component employs Framer Motion to add animation effects when the modal opens and closes. The `motion` component from Framer Motion is used to wrap the modal content, and animation properties such as `whileHover`, `whileTap`, `initial` and `animate` are applied to create a visually appealing transition.

### Custom Mouse Pointer

The Quiz Game features a custom mouse pointer to enhance the user experience. By leveraging CSS and JavaScript, a custom cursor is implemented to replace the default system cursor. The cursor is designed using react useEffect hook to listen to the mouse move and drag events and update the position of the cursor.






