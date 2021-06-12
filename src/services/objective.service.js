import axios from "axios";
import * as CONSTS from "../utils/consts"

const ObjectiveService = axios.create({
  baseURL: `${CONSTS.URL}/objectives`
})

export function ADD_OBJECTIVE(body, token) {
  return ObjectiveService.post("/add", body, {
    headers: {
      authorization: token,
    },
  });
}


export function EDIT_OBJECTIVE(body, token) {
  return ObjectiveService.post("/edit", body, {
    headers: {
      authorization: token,
    },
  });
}