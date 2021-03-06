import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import React from "react";
import * as ACTIONS_SERVICE from "../../services/actions.service";
import * as CONSTS from "../../utils/consts";
import DeleteAction from "./DeleteAction";
import "./Objectives.css";

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
    <div>
      <form onSubmit={(e) => handleSubmit(e, props._id)}>
        <TextField
          id="outlined-basic"
          label="Task"
          variant="outlined"
          type="text"
          type="text"
          name="action"
          onChange={handleChange}
          value={form.action}
        />
        <FormControl variant="outlined" id="outlined-basic">
          <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
          <Select name="status" /*value={form.status}*/ onChange={handleChange}>
            <MenuItem value="Not Started" name="Not Started">
              Not Started
            </MenuItem>
            <MenuItem value="In-Progress" name="In-Progress">
              In-progress
            </MenuItem>
            <MenuItem value="Completed" name="Completed">
              Completed
            </MenuItem>
          </Select>

          <button className="EditAction" type="submit">
            Edit Action
          </button>
        </FormControl>
        <DeleteAction actionId={actionId} getObjectives={props.getObjectives} />
      </form>
    </div>
  );
}

export default EditAction;
