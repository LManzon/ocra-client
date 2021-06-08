import React from "react";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts"
import * as OBJECTIVES_SERVICE from "../../services/objective.service"

function Objectives(props) {

  const [form, setForm] = React.useState({
    problem: "",
    objectiveInput: "",
    keyResult: "",
    objectiveEndDate: "",
    action: "",
    category: "",
    visibility: "",
    sharedWithUser: "",
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);


    OBJECTIVES_SERVICE.ADD_OBJECTIVE(form, accessToken)
      .then((response) => {
        console.log("response:", response);
        props.history.push(`${PATHS.OBJECTIVES_PAGE}/${response.data.objectives._id}`);
      })
      .catch((err) => {
        //console.error("err:", err.response);
      });

  }

  return (
    <div>
      <h1>Add a new objective</h1>

      <form onSubmit={handleSubmit}>
        <label>Problem</label>
        <input
          type="text"
          name="problem"
          placeholder="I have a problem X"
          onChange={handleChange}
          value={form.title}
        />

        <label>Enter your Objective</label>
        <input
          type="text"
          name="objectiveInput"
          placeholder="and I want to change Y"
          onChange={handleChange}
          value={form.objectiveInput}
        />

        <label>Key Results</label>
        <input
          type="text"
          name="keyResult"
          placeholder="X number/value for objective"
          onChange={handleChange}
          value={form.keyResult}
        />

        <label>Achieve by</label>

        <input
          type="date"
          name="objectiveEndDate"
          onChange={handleChange}
          value={form.objectiveEndDate}
        />

        <label>Things I need to do to achieve this</label>

        <input
          type="text"
          name="action"
          onChange={handleChange}
          value={form.action}
        />

        <label>Choose the category</label>

        <select name="category" onChange={handleChange} value={form.category}>
          <option name="Career">Career</option>
          <option name="Passion">Passion</option>
          <option name="Relationship">Relationship</option>
          <option name="Finance">Finance</option>
          <option name="Wellbeing">
            Wellbeing
          </option>
        </select>

        <label>Want to share this with others to get help & advise?</label>
        <select
          name="visibility"
          onChange={handleChange}
          value={form.visibility}
        >
          <option name="Public">Public</option>
          <option name="Private">Private</option>
          <option name="Friends">Friends</option>
        </select>

        <label>Share with</label>

        <input type="email" name="sharedWithUser"

          onChange={handleChange}
          value={form.sharedWithUser}
        />


        <button type="submit">Create Goal</button>




      </form>
    </div>
  );
}

export default Objectives;
