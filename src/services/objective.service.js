import axios from "axios";
import * as CONSTS from "../utils/consts";

const objectiveService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/objectives`,
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

export function DELETE_OBJECTIVE(body, token) {
  return objectiveService.post("/delete", body, {
    headers: {
      authorization: token,
    },
  });
}
