import TextField from "@material-ui/core/TextField";
import React from "react";
import * as ACTIONS_SERVICE from "../../services/actions.service";
import * as CONSTS from "../../utils/consts";

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
      <div>
        <div className="taskNameAndStatus">
          <div>
            {/* <FormControlLabel
              onSubmit={(e) => handleSubmit(e, objective._id)}
             
            /> */}

            <TextField
              id="outlined-basic"
              label="Task"
              variant="outlined"
              type="text"
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
        <button className="CreateTask" type="button" onClick={handleSubmit}>
          Create Task
        </button>
        <br></br> <br></br>
      </div>
    </div>
  );
}

export default Actions;
