import Fab from "@material-ui/core/Fab";
import axios from "axios";
import React from "react";
import "../App.css";
import Objectives from "../components/ObjectivesActions/Objectives";
import ShowObjectives from "../components/ObjectivesActions/ShowObjectives";

// import Actions from "../components/ObjectivesActions/Actions";
import * as CONSTS from "../utils/consts";

function HomePage(props) {
  const { user } = props;
  const [listOfObjectives, setListOfObjectives] = React.useState([]);
  const [displayAddObjective, setDisplayAddObjective] = React.useState(false);

  function addObjToggle() {
    setDisplayAddObjective(!displayAddObjective);
  }

  function getObjectives() {
    const token = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    axios
      .get(`${CONSTS.SERVER_URL}/objectives`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        // ?/   console.log("response che palleeeeeeee!!!!!!:", response);

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
  //console.log("newObj:", listOfObjectives);
  return (
    <div className="App">
      {user ? (
        <>
          {" "}
          <header className="App-header">
            <br></br>
            <ShowObjectives
              getObjectives={getObjectives}
              listOfObjectives={listOfObjectives}
            />
            <br />

            {displayAddObjective ? (
              <Objectives user={user} getObjectives={getObjectives}>
                {" "}
              </Objectives>
            ) : null}
            <Fab
              className="fab"
              color="primary"
              aria-label="add"
              onClick={addObjToggle}
            >
              +
            </Fab>
            {/* <Objectives user={user} getObjectives={getObjectives}></Objectives> */}
          </header>{" "}
        </>
      ) : (
        <h1>Welcome</h1>
      )}
    </div>
  );
}

export default HomePage;
