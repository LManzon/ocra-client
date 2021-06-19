import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import * as ACTIONS_SERVICE from "../../services/actions.service";
import { Link } from "react-router-dom";
import Actions from "../../components/ObjectivesActions/Actions";
import ShowAction from "./ShowActions";
import ShowObjectives from "./ShowObjectives";

function EditAction(props) {
  console.log("edit Action props:", props);
  const { action } = props;
  console.log("actions to display:", action);
  const [form, setForm] = React.useState({
    action: action.action,
    status: action.status,
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

    //  setForm({ ...form, [event.target.name]: event.target.value })

    ACTIONS_SERVICE.EDIT_ACTIONS({ ...form, actionId }, accessToken)
      .then((response) => {
        console.log("response:", response);
        // props.history.push(
        //   `${PATHS.OBJECTIVES_PAGE}/${response.data.objective._id}`
        // );
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
        // onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={form.action}
      />
      <select
        name="status"
        // onKeyDown={handleKeyDown}
        value={form.status}
        onChange={handleChange}
      >
        <option name="Public">Not Started</option>
        <option name="Private">In-progress</option>
        <option name="Friends">Completed</option>
      </select>

      <button type="submit">Create Goal</button>
    </form>
  );
}

export default EditAction;
