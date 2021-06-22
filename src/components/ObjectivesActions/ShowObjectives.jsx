import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import * as OBJECTIVES_SERVICE from "../../services/objective.service";
import { Link } from "react-router-dom";
import Actions from "../../components/ObjectivesActions/Actions";
import ShowAction from "./ShowActions";
import EditObjective from "./EditObjectives";

function ShowObjectives(props) {
  return (
    <div>
      {props.listOfObjectives.map((objective) => {
        const newObjectiveEndDate = objective.objectiveEndDate.split("T")[0];
        console.log("newObjDataFormat:", newObjectiveEndDate);

        return (



          <EditObjective
            getObjectives={props.getObjectives}
            objective={objective}
            key={objective._id}
            newObjectiveEndDate={newObjectiveEndDate}
          />
        );
      })}
    </div>
  );
}

export default ShowObjectives;
