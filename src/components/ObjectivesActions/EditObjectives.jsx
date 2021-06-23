import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import * as OBJECTIVES_SERVICE from "../../services/objective.service";
import { Link } from "react-router-dom";
import Actions from "../../components/ObjectivesActions/Actions";
import ShowAction from "./ShowActions";
import ShowObjectives from "./ShowObjectives";
import DeleteObjectives from "./DeleteObjectives";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Card from './Card.jsx'
import Tooltip from '@material-ui/core/Tooltip';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { sizing } from '@material-ui/system';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',

    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },

    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    TextField: {

      width: '1000',
    }
  },
}));




function EditObjective(props) {
  const { objective, newObjectiveEndDate } = props;
  console.log("propsXXX:", objective);
  console.log("propsXXX222:", newObjectiveEndDate);
  console.log("checkProps:", props);
  const objectiveId = objective._id;
  console.log("check objectiveId:", objectiveId);
  const [displayAddAction, setDisplayAddAction] = React.useState(false);
  const [action, setaction] = React.useState([]);

  const [form, setForm] = React.useState({
    problem: objective.problem,
    objectiveInput: objective.objectiveInput,
    keyResult: objective.keyResult,
    objectiveEndDate: newObjectiveEndDate,
    category: objective.category,
    visibility: objective.visibility,
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event, objectiveId) {
    console.log("objectiveId:", objectiveId);
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    //  setForm({ ...form, [event.target.name]: event.target.value })

    OBJECTIVES_SERVICE.EDIT_OBJECTIVE({ ...form, objectiveId }, accessToken)
      .then((response) => {
        console.log("response:", response);
        // props.history.push(
        //   `${PATHS.OBJECTIVES_PAGE}/${response.data.objective._id}`
        // );
      })
      .catch((err) => {
        console.error("err:");
      });
  }
  /*
    function deleteObjective(props) {
      console.log(props.objective._id);
      const objectiveId = props.objective._id;
  
      const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
      //  setForm({ ...form, [event.target.name]: event.target.value })
      OBJECTIVES_SERVICE.DELETE_OBJECTIVE({ objectiveId }, accessToken)
        .then((response) => {
          console.log("response:", response);
          // props.history.push(
          //   `${PATHS.OBJECTIVES_PAGE}/${response.data.objective._id}`
          // );
        })
        .catch((err) => {
          console.error("err:");
        });
    }
    */
  const classes = useStyles();
  return (
    <>
      <div>
        <form onSubmit={(e) => handleSubmit(e, objective._id)}>


          <Accordion >


            <Box fullWidth="True"
            >
              <AccordionSummary

                expandIcon={<ExpandMoreIcon />}
                // aria-controls="panel1bh-content"
                aria-controls="additional-actions2-content"
                id="panel1bh-header">
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox />}

                />


                <TextField id="outlined-basic" label="Problem" variant="outlined"                   fullWidth

                  type="text"
                  name="problem"
                  // onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  value={form.problem}

                />



              </AccordionSummary>
            </Box>

            <AccordionDetails>
              <Typography>


                <TextField id="outlined-basic" label="Objective" variant="outlined"
              
                    type="text"
                    name="objectiveInput"
                    placeholder="and I want to change Y"
                    onChange={handleChange}
                    value={form.objectiveInput}
                    fullWidth 
                
                />


                <TextField id="outlined-basic" label="Key Result" variant="outlined"
                  type="text"
                  name="keyResult"
                  placeholder="X number/value for objective"
                  // onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  value={form.keyResult}
                />

                <TextField id="outlined-basic" variant="outlined"
                  type="date"
                  id="date"
                  name="objectiveEndDate"
                  // onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  value={form.objectiveEndDate}
                />

                <select
                  name="category"
                  // onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  value={form.category}
                >
                  <option name="Career">Career</option>
                  <option name="Passion">Passion</option>
                  <option name="Relationship">Relationship</option>
                  <option name="Financial">Financial</option>
                  <option name="Wellbeing">Wellbeing</option>
                </select>

                <select
                  name="visibility"
                  // onKeyDown={handleKeyDown}
                  value={form.visibility}
                  onChange={handleChange}
                >
                  <option name="Public">Public</option>
                  <option name="Private">Private</option>
                  <option name="Friends">Friends</option>
                </select>

                <button type="submit" name="edit">
                  Edit
        </button>


                <DeleteObjectives
                  objectiveId={objectiveId}
                  getObjectives={props.getObjectives}
                ></DeleteObjectives>

                <Actions  getObjectives={props.getObjectives} objective={objective} />
                <ShowAction getObjectives={props.getObjectives} objective={objective} />
              </Typography>
            </AccordionDetails>
          </Accordion>

        </form>
        <br />
      </div>

    </>


  );
}

export default EditObjective;
