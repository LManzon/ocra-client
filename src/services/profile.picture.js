import axios from "axios";
import * as CONSTS from "../utils/consts";

const profilePicture = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/profile`,
});

export function UPDATE_PICTURE(body, token) {
  return profilePicture.post(`/updatePicture`, body, {
    headers: {
      authorization: token,
    },
  });
}
