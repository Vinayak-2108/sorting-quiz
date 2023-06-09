import React, {useState, useEffect} from "react";
import { DragLists } from "./components/DragLists";


const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    function handleMove(e) {
      setDragging(false);
      setPosition({ x: e.clientX, y: e.clientY });
    }
    function handleDrag(e) {
      
      setPosition({ x: e.clientX, y: e.clientY });
      setDragging(true);
    }
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('drag', handleDrag);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('drag', handleDrag);
    };
  }, []);
    return (
      <>
      <div style={{
      position: 'absolute',
      backgroundColor: `${dragging ? '':('purple')}`,
      borderRadius: '50%',
      opacity: 0.6,
      transform: `translate(${position.x}px, ${position.y}px)`,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      zIndex:10,
      width: 40,
      height: 40,
    }} />
        <div className="main">
          <div className="gradient"></div>
        </div>
        <div className="flex flex-col items-center justify-center h-screen ">
           <DragLists />
            
        </div>
      </>
    );
};

export default App;
