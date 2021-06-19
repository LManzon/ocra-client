import React from "react";
import "../App.css";
import Objectives from "../components/ObjectivesActions/Objectives";
import ShowObjectives from "../components/ObjectivesActions/ShowObjectives";
import Actions from "../components/ObjectivesActions/Actions";
import axios from "axios";
import * as CONSTS from "../utils/consts";

function HomePage(props) {
  const { user } = props;
  const [listOfObjectives, setListOfObjectives] = React.useState([]);

  function getObjectives() {
    const token = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    axios
      .get(`${CONSTS.SERVER_URL}/objectives`, {
        headers: {
          authorization: token,
        },
      })
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
    return () => console.log("something");
  }, []);
  console.log("newObj:", listOfObjectives);
  return (
    <div className="App">
      {user ? (
        <>
          {" "}
          <header className="App-header">
            <Objectives user={user} getObjectives={getObjectives}></Objectives>
            <br></br>
            <ShowObjectives
              getObjectives={getObjectives}
              listOfObjectives={listOfObjectives}
            />
          </header>{" "}
        </>
      ) : (
        <>
          <h1> Welcome to ocra</h1>
        </>
      )}
    </div>
  );
}

export default HomePage;
