import axios from "axios";
import * as CONSTS from "../utils/consts";

const objectiveService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/profile`,
});

export function ADD_OBJECTIVE(body, token) {
  return objectiveService.post("/add", body, {
    headers: {
      authorization: token,
    },
  });
}

export function EDIT_OBJECTIVE(body, token) {
  return objectiveService.post("/edit", body, {
    headers: {
      authorization: token,
    },
  });
}
// return objectiveService.post("/addObjective", body, {
//   headers: {
//     authorization: token,
//   },
// });
//}
