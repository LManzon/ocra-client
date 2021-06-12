import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import * as OBJECTIVES_SERVICE from "../../services/objective.service";
import { Link } from "react-router-dom";

function EditObjective(props) {
  const [form, setForm] = React.useState({
    problem: props.problem,
    objectiveInput: props.objectiveInput,
    keyResult: props.keyResult,
    objectiveEndDate: props.objectiveEndDate || "",
    category: props.category,
    visibility: props.visibility,
    // sharedWithUser:
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event, objectiveId) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    //  setForm({ ...form, [event.target.name]: event.target.value })

    OBJECTIVES_SERVICE.EDIT_OBJECTIVE({ ...form, objectiveId }, accessToken)
      .then((response) => {
        console.log("response:", response);
        props.history.push(
          `${PATHS.OBJECTIVES_PAGE}/${response.data.objective._id}`
        );
      })
      .catch((err) => {
        console.error("err:", err);
      });
  }
  return (
    <form onSubmit={(e) => handleSubmit(e, props._id)}>
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
        <option name="Finance">Finance</option>
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

      <button type="submit">Create Goal</button>
    </form>
  );
}

function ShowObjectives(props) {
  const [listOfObjectives, setListOfObjectives] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${CONSTS.URL}/Objectives`)
      .then((response) => {
        //  console.log("response:", response);
        setListOfObjectives(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => console.log("something");
  }, []);

  //   {/* <form key={objective._id} onSubmit={handleSubmit}> */}

  return (
    <div>
      <h1>List of Objectives</h1>

      {listOfObjectives.map((objective) => {
        return <EditObjective {...objective} key={objective._id} />;
      })}
    </div>
  );
}

export default ShowObjectives;
