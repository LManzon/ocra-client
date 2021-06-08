import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts"
import * as OBJECTIVES_SERVICE from "../../services/objective.service"
import { Link } from "react-router-dom";

function ShowObjectives() {
    const [listOfObjectives, setListOfObjectives] = React.useState([]);


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
            {listOfObjectives.map((objective) => {

                return (
                    <section key={objective._id}>
                        <h2>{objective.problem}</h2>


                    </section>
                );
            })}
        </div>
    );
}

export default ShowObjectives;
