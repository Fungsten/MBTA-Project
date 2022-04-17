import React from "react";
import Today from "../utils/Today";
import Schedule from "../utils/Schedule";
  
const Commuter = () => {

  return (
    <div>
      <h1>
        North Station Commuter Rail Schedule
      </h1>
      <header className="App-header">
        Today is: <Today />
        <p></p>
        <Schedule />
      </header>
    </div>
  );
};
  
export default Commuter;