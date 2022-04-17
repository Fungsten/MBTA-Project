import React from "react";
import Today from "../utils/Today";
import Prediction from "../utils/Prediction";
  
const Commuter = () => {

  return (
    <div>
      <h1>
        North Station Commuter Rail Schedule
      </h1>
      <header className="App-header">
        Today is: <Today />
        <p></p>
        <Prediction />
      </header>
    </div>
  );
};
  
export default Commuter;