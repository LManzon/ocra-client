import React from "react";
import EditObjective from "./EditObjectives";

function ShowObjectives(props) {
  return (
    <div>
      {props.listOfObjectives.map((objective) => {
        const newObjectiveEndDate = objective.objectiveEndDate.split("T")[0];
        //    console.log("newObjDataFormat:", newObjectiveEndDate);

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
