import React from "react";
import "../App.css";
import Objectives from "../components/ObjectivesActions/Objectives";
import ShowObjectives from "../components/ObjectivesActions/ShowObjectives";
import Actions from "../components/ObjectivesActions/Actions";

function HomePage(props) {
  return (
    <div className="App">
      <header className="App-header">
        <Objectives></Objectives>
        <br></br>
        <ShowObjectives></ShowObjectives>
        <Actions objective={objective}/>
      </header>
    </div>
  );
}

export default HomePage;
