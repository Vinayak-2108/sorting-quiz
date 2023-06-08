import React from "react";
import { DragLists } from "./components/DragLists";
const App = () => {
    return (
      <>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <div className="flex flex-col items-center justify-center h-screen">
           <DragLists />
            
        </div>
      </>
    );
};

export default App;
