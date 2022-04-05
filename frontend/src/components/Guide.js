import React from "react";
import 'antd/dist/antd.css';

import "../index.css";
import alchemylogo from "../alchemylogo.svg";

const Guide = () => {
  const hhh = () =>{
    alert("Hello! I am an alert box!");
  }

  //the UI of our component
  return (
    <div id="container">
      <img id="logo" src={alchemylogo}></img>
      
      
      <div id="container_functions">
      <button id="function_module" onClick={hhh}>
          <span>Hunt Monsters</span>
      </button>

      <button id="function_module" onClick={hhh}>
        
          <span>Duel</span>
      </button>

       <button id="function_module" onClick={hhh}>
          <span>Trade</span>
      </button>
      <button id="function_module" onClick={hhh}>
          <span>Bank</span>
      </button>
      </div>

      
    </div>
  );
};

export default Guide;