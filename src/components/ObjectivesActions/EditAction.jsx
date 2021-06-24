import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import * as ACTIONS_SERVICE from "../../services/actions.service";
import { Link } from "react-router-dom";
import Actions from "../../components/ObjectivesActions/Actions";
import ShowAction from "./ShowActions";
import ShowObjectives from "./ShowObjectives";
import DeleteAction from "./DeleteAction";

function EditAction(props) {
  console.log("edit Action props:", props);
  const { action, status } = props;
  const actionId = props._id;
  console.log("actionIDVVV:", actionId);
  console.log("actions to display:", action);
  console.log("actions to display:", status);
  const [form, setForm] = React.useState({
    action: action,
    status: status,
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event, actionId) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    ACTIONS_SERVICE.EDIT_ACTIONS({ ...form, actionId }, accessToken)
      .then((response) => {
        console.log("response:", response);
      })
      .catch((err) => {
        console.error("err:", err);
      });
  }
  return (
    <form onSubmit={(e) => handleSubmit(e, props._id)}>
      <input
        type="text"
        name="action"
        onChange={handleChange}
        value={form.action}
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option name="Public">Not Started</option>
        <option name="Private">In-progress</option>
        <option name="Friends">Completed</option>
      </select>

      <button type="submit">Create Goal</button>
      <DeleteAction actionId={actionId} getObjectives={props.getObjectives} />
    </form>
  );
}

export default EditAction;