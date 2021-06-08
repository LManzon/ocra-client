import React from "react";
import "../App.css";
import Objectives from "../components/ObjectivesActions/Objectives";
import ShowObjectives from "../components/ObjectivesActions/ShowObjectives"

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">


        <Objectives></Objectives>
        <ShowObjectives></ShowObjectives>

      </header>
    </div>
  );
}

export default HomePage;
