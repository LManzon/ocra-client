import React from "react";
import "../App.css";
import Objectives from "../components/ObjectivesActions/Objectives";
import ShowObjectives from "../components/ObjectivesActions/ShowObjectives";
import Actions from "../components/ObjectivesActions/Actions";
import axios from "axios";
import * as CONSTS from "../utils/consts";

function HomePage(props) {
  const [listOfObjectives, setListOfObjectives] = React.useState([]);

  function getObjectives() {
    axios
      .get(`${CONSTS.SERVER_URL}/Objectives`)
      .then((response) => {
        console.log("response:", response);
        setListOfObjectives(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  React.useEffect(() => {
    getObjectives();
    // axios
    //   .get(`${CONSTS.SERVER_URL}/Objectives`)
    //   .then((response) => {
    //     console.log("response:", response);
    //     setListOfObjectives(response.data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    return () => console.log("something");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Objectives getObjectives={getObjectives}></Objectives>
        <br></br>
        <ShowObjectives listOfObjectives={listOfObjectives}></ShowObjectives>
        {/* <Actions /> */}
      </header>
    </div>
  );
}

export default HomePage;
