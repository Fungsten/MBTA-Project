import React from "react";
import Clock from "../utils/Clock";
import Today from "../utils/Today";
import Prediction from "../utils/Prediction";
  
const Commuter = () => {

  return (
    <div>
      <h1>
        North Station Commuter Rail Schedule
      </h1>
      <header className="App-header">
        <Today />
        <Clock />
        <br></br>
        <Prediction />
      </header>
    </div>
  );
};
  
export default Commuter;