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

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, objective._id)}>
        <input
          type="text"
          name="problem"
          // onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={form.problem}
        />

        <input
          type="text"
          name="objectiveInput"
          placeholder="and I want to change Y"
          // onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={form.objectiveInput}
        />

        <input
          type="text"
          name="keyResult"
          placeholder="X number/value for objective"
          // onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={form.keyResult}
        />

        <input
          type="date"
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
          cd
          <option name="Public">Public</option>
          <option name="Private">Private</option>
          <option name="Friends">Friends</option>
        </select>

        <button type="submit" name="edit">
          Edit
        </button>
      </form>

      <DeleteObjectives
        objectiveId={objectiveId}
        getObjectives={props.getObjectives}
      ></DeleteObjectives>
      <Actions getObjectives={props.getObjectives} objective={objective} />
      <ShowAction getObjectives={props.getObjectives} objective={objective} />
    </>
  );
}

export default EditObjective;
