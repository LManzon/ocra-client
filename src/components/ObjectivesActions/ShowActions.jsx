import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import * as ACTIONS_SERVICE from "../../services/actions.service";
import { Link } from "react-router-dom";
import EditAction from "./EditAction";

function ShowAction(props) {
  console.log("props show action:", props);

  const action = props.objective.action;
  console.log("listofAction:", props.objective.action);

  return (
    <div>
      <h1>List of Objectives</h1>

      {props.objective.action.map((event) => {
        return <EditAction {...event} key={event._id} />;
      })}
    </div>
  );
}

export default ShowAction;
