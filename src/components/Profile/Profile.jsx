import React from "react";
import * as PATHS from "../../utils/paths";
import { Redirect } from "react-router-dom";
import * as CONSTS from "../../utils/consts";
import * as PROFILE_SERVICE from "../../services/profile.service.js";

import axios from "axios";
import ProtectedRoute from "../../routing-components/ProtectedRoute";

export default function ProfilePage(props) {
  const [displayUpdateProfile, setDisplayUpdateProfile] = React.useState(false);
  const [displayUpdatePassword, setDisplayUpdatePassword] = React.useState(
    false
  );

  const { user, authenticate } = props;

  function profileToggle() {
    setDisplayUpdateProfile(!displayUpdateProfile);
  }

  function passwordToggle() {
    setDisplayUpdatePassword(!displayUpdatePassword);
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <img
        src={user.profilePic}
        width="200px"
        alt={`Profile picture for ${user.name}`}
      />
      <button onClick={profileToggle}> Update Profile</button>
      {displayUpdateProfile ? (
        <UpdateProfile user={user} authenticate={authenticate} />
      ) : null}
      <button onClick={passwordToggle}> Change Password</button>
      {displayUpdatePassword && <UpdatePassword authenticate={authenticate} />}
      <button> Delete Account</button>
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          name="name"
          placeholder="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Surname</label>
        <input
          name="surname"
          placeholder="surname"
          value={form.surname}
          onChange={handleChange}
        />
      </div>
      <div>
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

function UpdatePassword() {
  return (
    <form>
      <div>
        <label>Current Password</label>
        <input name="password" placeholder="Current Password" />
      </div>
      <div>
        <label>New password</label>
        <input name="password" placeholder="New Password" />
      </div>
      <div>
        <label>Confirm New Password</label>
        <input name="password" placeholder="Confirm New Password" />
      </div>
      <button>Update Password</button>
    </form>
  );
}
