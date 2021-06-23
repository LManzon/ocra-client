import React from "react";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import * as ACTIONS_SERVICE from "../../services/actions.service";
import Objectives from "./Objectives";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Styles from './Objectives.css'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

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
      })
      .catch((err) => {
        console.error("err:", err.response);
      });
  }

  console.log(objective);

  return (
    <div>
      <p>Tasks</p>

      <form onSubmit={handleSubmit}>
        <div>

          <TextField id="outlined-basic" label="Task" variant="outlined"
            type="text"
            name="action"
            placeholder="I need to do this"
            onChange={handleChange}
            value={form.action}
          />
        </div>

        <div>
          <Select name="status" value={form.status} onChange={handleChange} label="status">
            <MenuItem name="Not Started">Not Started</MenuItem>
            <MenuItem name="In-Progress">In-Progress</MenuItem>
            <MenuItem name="Completed">Completed</MenuItem>
          </Select>
        </div>

        <button type="submit">Create an Action</button>
      </form>
    </div>
  );
}

export default Actions;
