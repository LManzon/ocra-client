import React from "react";
import * as PATHS from "../../utils/paths";
import { Redirect } from "react-router-dom";
import * as CONSTS from "../../utils/consts";
import * as PROFILE_SERVICE from "../../services/profile.service.js";
import * as PROFILE_PICTURE from "../../services/profile.picture.js";
import Objectives from "../ObjectivesActions/Objectives";
import "./Profile.css";
import axios from "axios";
import ProtectedRoute from "../../routing-components/ProtectedRoute";

export default function ProfilePage(props) {
  const [displayUpdateProfile, setDisplayUpdateProfile] = React.useState(false);
  const [displayUpdatePicture, setDisplayUpdatePicture] = React.useState(null);

  const { user, setUser, authenticate } = props;

  function profileToggle() {
    setDisplayUpdateProfile(!displayUpdateProfile);
  }

  function pictureToggle() {
    setDisplayUpdatePicture(!displayUpdatePicture);
  }

  function deleteProfile() {}

  return (
    <div className="profilePage">
      <div class="editProfile">
        <img
          src={user.profilePic}
          width="200px"
          alt={`Profile picture for ${user.name}`}
          class="profilePic"
        />
        <h1 class="profileName">{user.name}</h1>
      </div>
      <div>
        <br />
        <UpdateProfile user={user} authenticate={authenticate} />
        <br />
        <br />
        <UpdatePicture
          user={user}
          setUser={setUser}
          authenticate={authenticate}
        />
      </div>

      {/* <button onClick={pictureToggle}> Update Picture</button>
      {displayUpdatePicture ? (
        <UpdatePicture
          user={user}
          setUser={setUser}
          authenticate={authenticate}
        />
      ) : null}
      <br />
      <button onClick={profileToggle}> Update Profile</button>
      {displayUpdateProfile ? (
        <UpdateProfile user={user} authenticate={authenticate} />
      ) : null} */}
      {/* <button onClick={passwordToggle}> Change Password</button>
      {displayUpdatePassword && <UpdatePassword authenticate={authenticate} />} */}
      {/* <button onClick={deleteProfile}> Delete Account</button> */}
    </div>
  );
}

function UpdateProfile(props) {
  const { user } = props;
  const [form, setForm] = React.useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    PROFILE_SERVICE.UPDATE_PROFILE(form, accessToken)
      // axios
      //   .put(`http://localhost:5005/api/profile/update`, form, {
      //     headers: {
      //       authorization: accessToken,
      //     },
      //   })
      .then((response) => {
        console.log("response:", response);
        props.authenticate(response.data.user);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }

  return (
    <form onSubmit={handleSubmit} class="editForm">
      <div class="editValue">
        <label>Name</label>
        <input
          name="name"
          placeholder="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div class="editValue">
        <label>Surname</label>
        <input
          name="surname"
          placeholder="surname"
          value={form.surname}
          onChange={handleChange}
        />
      </div>
      <div class="editValue">
        <label>email</label>
        <input
          name="email"
          placeholder="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <button>Update Profile</button>
    </form>
  );
}

function UpdatePicture(props) {
  const { user, setUser } = props;
  const [newPicture, setNewPicture] = React.useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    if (!newPicture) {
      return;
    }

    const formBody = new window.FormData();

    formBody.append("profilePic", newPicture);

    PROFILE_PICTURE.UPDATE_PICTURE(formBody, accessToken)
      .then((res) => {
        console.log(res);
        setUser({ ...user, profilePic: res.data.picFromServer });
      })
      .catch((err) => console.log(err.response));
  }

  function handleChange(event) {
    const image = event.target.files[0];

    setNewPicture(image);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
      <button type="submit"> Update Picture</button>
    </form>
  );
}

function DeleteProfile() {}

// function UpdatePassword() {
//   return (
//     <form>
//       <div>
//         <label>Current Password</label>
//         <input name="password" placeholder="Current Password" />
//       </div>
//       <div>
//         <label>New password</label>
//         <input name="password" placeholder="New Password" />
//       </div>
//       <div>
//         <label>Confirm New Password</label>
//         <input name="password" placeholder="Confirm New Password" />
//       </div>
//       <button>Update Password</button>
//     </form>
//   );
// }
