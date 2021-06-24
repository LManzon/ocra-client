import React from "react";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import * as ACTIONS_SERVICE from "../../services/actions.service";
import Objectives from "./Objectives";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

function Actions(props) {
  const { objective } = props;

  const [form, setForm] = React.useState({
    action: "",
    // status: "",
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
      })
      .catch((err) => {
        console.error("err:", err.response);
      });
  }

  console.log(objective);

  return (
    <div>

      <form onSubmit={handleSubmit}>
      <div className="taskNameAndStatus">

        <div>

 

        <TextField id="outlined-basic"  label="Task" variant="outlined"               type="text"
            name="action"
            placeholder="I need to do this"
            onChange={handleChange}
            value={form.action}
            fullWidth
          />
        </div>

        <div>

        {/* <FormControl variant="outlined" >

<InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
          <Select name="status" value={form.status} onChange={handleChange}>
            <MenuItem value="Not Started" name="Not Started">Not Started</MenuItem>
            <MenuItem value="In-Progress" name="In-Progress">In-Progress</MenuItem>
            <MenuItem value="Completed" name="Completed">Completed</MenuItem>
          </Select>
          </FormControl> */}
        </div>
        </div>


        <button  className="CreateTask" type="submit">Create Task</button>
        <br></br>        <br></br>

      </form>
    </div>
  );
}

export default Actions;