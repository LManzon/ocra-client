import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts"
import * as OBJECTIVES_SERVICE from "../../services/objective.service"
import { Link } from "react-router-dom";
import ReactDOM from "react-dom"

function ShowObjectives(props) {
    const [listOfObjectives, setListOfObjectives] = React.useState([]);
    const { user, authenticate, objective } = props;

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
            [event.target.name]: event.target.defaultValue,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
        console.log(event.target.name)
        //  setForm({ ...form, [event.target.name]: event.target.defaultValue })

        OBJECTIVES_SERVICE.EDIT_OBJECTIVE(form, accessToken)
            .then((response) => {
                console.log("response:", response);
                props.history.push(`${PATHS.OBJECTIVES_PAGE}/${response.data.objective._id}`);
            })
            .catch((err) => {
                console.error("err:", err.response);
            });



    }


    function handleKeyDown(event) {

        if (event.keyCode === 13) {
            handleChange(event)
        }
    }




    React.useEffect(() => {
        axios
            .get(`${CONSTS.URL}/Objectives`)
            .then((response) => {
                console.log("response:", response);
                setListOfObjectives(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
        return () => console.log("something");
    }, []);


    return (

        <div>
            <h1>List of Objectives</h1>

            {listOfObjectives.map((objective) => {

                return (

                    <form key={objective._id} onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="problem"
                            onKeyDown={handleKeyDown}
                            defaultValue={objective.problem}
                        />

                        <input
                            type="text"
                            name="objectiveInput"
                            placeholder="and I want to change Y"
                            onKeyDown={handleKeyDown}
                            defaultValue={objective.objectiveInput}
                        />

                        <input
                            type="text"
                            name="keyResult"
                            placeholder="X number/value for objective"
                            onKeyDown={handleKeyDown}
                            defaultValue={objective.keyResult}
                        />

                        <input
                            type="date"
                            name="objectiveEndDate"
                            onKeyDown={handleKeyDown}
                            defaultValue={objective.objectiveEndDate}
                        />

                        <input
                            type="text"
                            name="action"
                            onKeyDown={handleKeyDown}
                            defaultValue={objective.action}
                        />


                        <select name="category" onKeyDown={handleKeyDown} defaultValue={objective.category}>
                            <option name="Career">Career</option>
                            <option name="Passion">Passion</option>
                            <option name="Relationship">Relationship</option>
                            <option name="Finance">Finance</option>
                            <option name="Wellbeing">
                                Wellbeing
          </option>
                        </select>


                        <select
                            name="visibility"
                            onKeyDown={handleKeyDown}
                            defaultValue={objective.visibility}
                        >
                            <option name="Public">Public</option>
                            <option name="Private">Private</option>
                            <option name="Friends">Friends</option>
                        </select>

                        <input type="email" name="sharedWithUser"

                            onKeyDown={handleKeyDown}
                            defaultValue={objective.sharedWithUser}
                        />


                        <button type="submit">Create Goal</button>







                    </form>
                );
            })}
        </div>
    );
}




export default ShowObjectives;
