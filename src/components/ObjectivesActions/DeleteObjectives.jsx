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

    function deleteObjective(props) {
        console.log("THIS IS IT:", props);

        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
        //  setForm({ ...form, [event.target.name]: event.target.value })
        OBJECTIVES_SERVICE.DELETE_OBJECTIVE({ objectiveId }, accessToken)
            .then((response) => {
                console.log("response:", response);
                // props.history.push(
                //   `${PATHS.OBJECTIVES_PAGE}/${response.data.objective._id}`
                // );
            })
            .catch((err) => {
                console.error("err:");
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
