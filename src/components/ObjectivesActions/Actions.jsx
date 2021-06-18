import React from "react";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import * as ACTIONS_SERVICE from "../../services/actions.service";
import Objectives from "./Objectives";

function Actions(props) {
  const { objective } = props;

  const [form, setForm] = React.useState({
    action: "",
    status: "",
  });

  function handleChange(event) {
    console.log("form:", event);
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    ACTIONS_SERVICE.ADD_ACTIONS(
      { ...form, objectiveId: objective._id },
      accessToken
    )
      .then((response) => {
        console.log("response:", response);
        props.getObjectives();

        // props.history.push(
        //   `${PATHS.PROFILE_PAGE}/${response.data.objectives._id}`
        // );
      })
      .catch((err) => {
        console.error("err:", err.response);
      });
  }

  console.log(objective);

  return (
    <div>
      <h1>Add a new Action</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Action</label>
          <input
            type="text"
            name="action"
            placeholder="I need to do this"
            onChange={handleChange}
            value={form.action}
          />
        </div>

        <div>
          <label>status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option name="Not Started">Not Started</option>
            <option name="In-Progress">In-Progress</option>
            <option name="Completed">Completed</option>
          </select>
        </div>

        <button type="submit">Create an Action</button>
      </form>
    </div>
  );
}

export default Actions;
