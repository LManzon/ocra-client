import React from "react";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import * as OBJECTIVE_SERVICE from "../../services/objective.service";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Styles from "./Objectives.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavigationIcon from "@material-ui/icons/Navigation";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
}));

function Objectives(props) {
  const { user } = props;
  const [form, setForm] = React.useState({
    problem: "",
    objectiveInput: "",
    keyResult: "",
    objectiveEndDate: 0,
    action: [],
    category: "",
    // visibility: "",
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

    OBJECTIVE_SERVICE.ADD_OBJECTIVE({ ...form, user }, accessToken)
      .then((response) => {
        console.log("response:", response);
        props.getObjectives();
      })
      .catch((err) => {
        console.error("err:", err);
        console.error(err.response);
      });
  }

  const classes = useStyles();

  return (
    <div>
      <h2>Create a new Goal</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="outlined-basic"
            label="Problem you want solve"
            variant="outlined"
            className="textfield"
            type="text"
            name="problem"
            placeholder="eg. I want to fight poverty"
            onChange={handleChange}
            value={form.problem}
            fullWidth
          />
        </div>
        <br></br>
        <div>
          {/* <TextField
            id="outlined-basic"
            label="Objective"
            variant="outlined"
            type="text"
            style={{ width: 400 }}
            name="objectiveInput"
            placeholder="and I want to change Y"
            onChange={handleChange}
            value={form.objectiveInput}
          /> */}
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Key Result"
            variant="outlined"
            type="text"
            name="keyResult"
            placeholder="eg. Help 1x out of poverty"
            onChange={handleChange}
            value={form.keyResult}
            fullWidth
          />
        </div>
        <br></br>
        <div>
          <TextField
            label="Achieve by"
            style={{ width: 400 }}
            defaultValue="2017-05-24"
            id="date"
            type="date"
            name="objectiveEndDate"
            onChange={handleChange}
            value={form.objectiveEndDate}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <br></br>
        <div>
          <Select
            id="demo-simple-select-helper"
            name="category"
            onChange={handleChange}
            value={form.category}
            fullWidth
            // defaultValue="Career"
          >
            <MenuItem value="Career" name="Career">
              Career
            </MenuItem>
            <MenuItem value="Passion" name="Passion">
              Passion
            </MenuItem>
            <MenuItem value="Relationship" name="Relationship">
              Relationship
            </MenuItem>
            <MenuItem value="Financial">Financial</MenuItem>
            <MenuItem value="Wellbeing">Wellbeing</MenuItem>
          </Select>
        </div>
        <br></br>
        <div>
          <Select
            style={{ width: 400 }}
            label="Shars"
            id="demo-simple-select-outlined"
            name="visibility"
            onChange={handleChange}
            value={form.visibility}
          >
            <MenuItem value="Public" name="Public">
              Public
            </MenuItem>
            <MenuItem value="Career" name="Private">
              Private
            </MenuItem>
            <MenuItem value="Friends" name="Friends">
              Friends
            </MenuItem>
          </Select>
        </div>{" "}
        <br></br>
        <Button
          style={{ width: 410, height: 45 }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Create
        </Button>
      </form>
      <br></br>
    </div>
  );
}

export default Objectives;
