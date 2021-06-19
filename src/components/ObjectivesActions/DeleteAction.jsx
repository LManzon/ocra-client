import React from "react";
import * as ACTIONS_SERVICE from "../../services/actions.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";

export default function DeleteAction(props) {
  console.log("delete action props:", props);
  const actionId = props.actionId;
  console.log("actionId:", actionId);

  function deleteAction() {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    ACTIONS_SERVICE.DELETE_ACTIONS({ actionId }, accessToken)
      .then((response) => {
        console.log("response:", response);
        props.getObjectives();
      })
      .catch((err) => {
        console.error("err:", err);
      });
  }
  return (
    <div>
      <button type="button" onClick={() => deleteAction()} name="delete">
        Delete Action
      </button>
    </div>
  );
}
