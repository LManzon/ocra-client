import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import * as OBJECTIVES_SERVICE from "../../services/objective.service";
import { Link } from "react-router-dom";
import Actions from "../../components/ObjectivesActions/Actions";
import ShowAction from "./ShowActions";
import ShowObjectives from "./ShowObjectives";

function DeleteObjectives(props) {
  console.log("check delete props:", props);
  const objectiveId = props.objectiveId;
  console.log("THIS IS IT:", props.objectiveId);

  function deleteObjective() {
    console.log("THIS IS IT:", props);

    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    OBJECTIVES_SERVICE.DELETE_OBJECTIVE({ objectiveId }, accessToken)
      .then((response) => {
        console.log("response:", response);
        props.getObjectives();
      })
      .catch((err) => {
        console.error("err:", err);
      });
  }

  console.log("prop check:", props);
  return (
    <div>
      <button type="button" onClick={() => deleteObjective()} name="delete">
        Delete
      </button>
    </div>
  );
}

export default DeleteObjectives;
