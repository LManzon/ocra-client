import React from "react";
import EditAction from "./EditAction";

function ShowAction(props) {
  //console.log("props show action:", props);

  // const action = props.objective.action;
  // console.log("listofAction:", props.objective.action);

  return (
    <div>
      {props.objective.action.map((event) => {
        return (
          <EditAction
            {...event}
            key={event._id}
            getObjectives={props.getObjectives}
          />
        );
      })}
    </div>
  );
}

export default ShowAction;
