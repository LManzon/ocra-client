import axios from "axios";
import * as CONSTS from "../utils/consts";

const actionsService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/actions`,
});

export function ADD_ACTIONS(body, token) {
  return actionsService.post("/add", body, {
    headers: {
      authorization: token,
    },
  });
}

export function EDIT_ACTIONS(body, token) {
  return actionsService.post("/edit", body, {
    headers: {
      authorization: token,
    },
  });
}

export function DELETE_ACTIONS(body, token) {
  return actionsService.post("/delete", body, {
    headers: {
      authorization: token,
    },
  });
}