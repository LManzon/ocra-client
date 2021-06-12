import React from "react";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import * as OBJECTIVE_SERVICE from "../../services/objective.service";

//

function Objectives(props) {
  const [form, setForm] = React.useState({
    problem: "",
    objectiveInput: "",
    keyResult: "",
    objectiveEndDate: 0,
    // action: "",
    category: "",
    visibility: "",
    sharedWithUser: "",
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

    OBJECTIVE_SERVICE.ADD_OBJECTIVE(form, accessToken)
      .then((response) => {
        console.log("response:", response);
        props.history.push(
          `${PATHS.PROFILE_PAGE}/${response.data.objectives._id}`
        );
      })
      .catch((err) => {
        console.error("err:", err.response);
      });
  }

  return (
    <div>
      <h1>Add a new objective</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Problem</label>
          <input
            type="text"
            name="problem"
            placeholder="I have a problem X"
            onChange={handleChange}
            value={form.problem}
          />
        </div>
        <div>
          <label>Enter your Objective</label>
          <input
            type="text"
            name="objectiveInput"
            placeholder="and I want to change Y"
            onChange={handleChange}
            value={form.objectiveInput}
          />
        </div>
        <div>
          <label>Key Results</label>
          <input
            type="text"
            name="keyResult"
            placeholder="X number/value for objective"
            onChange={handleChange}
            value={form.keyResult}
          />
        </div>
        <div>
          <label>Achieve by</label>
          <input
            type="date"
            name="objectiveEndDate"
            onChange={handleChange}
            value={form.objectiveEndDate}
          />
        </div>
        {/* <div>
          <label>Things I need to do to achieve this</label>

          <input
            type="text"
            name="action"
            onChange={handleChange}
            value={form.action}
          />
        </div> */}
        <div>
          <label>Choose the category</label>

          <select name="category" onChange={handleChange} value={form.category}>
            <option name="Career">Career</option>
            <option name="Passion">Passion</option>
            <option name="Relationship">Relationship</option>
            <option name="Finance">Finance</option>
            <option name="Wellbeing">Wellbeing</option>
          </select>
        </div>
        <div>
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
        </div>
        {/* <div>
          <label>Share with</label>

          <input
            type="email"
            name="sharedWithUser"
            onChange={handleChange}
            value={form.sharedWithUser}
          />
        </div> */}

        <button type="submit">Create Goal</button>
      </form>
    </div>
  );
}

export default Objectives;
