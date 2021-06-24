import React from "react";
import * as PROFILE_PICTURE from "../../services/profile.picture.js";
import * as PROFILE_SERVICE from "../../services/profile.service.js";
import * as CONSTS from "../../utils/consts";
import "./Profile.css";
import axios from "axios";
import ProtectedRoute from "../../routing-components/ProtectedRoute";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ProfilePage(props) {
  // const [displayUpdateProfile, setDisplayUpdateProfile] = React.useState(false);
  // const [displayUpdatePicture, setDisplayUpdatePicture] = React.useState(null);

  const { user, setUser, authenticate } = props;

  // function profileToggle() {
  //   setDisplayUpdateProfile(!displayUpdateProfile);
  // }

  // function pictureToggle() {
  //   setDisplayUpdatePicture(!displayUpdatePicture);
  // }

  // function deleteProfile() {}

  return (
    <div className="profilePage">
      <div class="editProfile">
        <img
          src={user.profilePic}
          width="200px"
          alt={`Profile for ${user.name}`}
          class="profilePic"
        />
        <div>
          <h3 class="profileInfo">
            {user.name} {user.surname}
          </h3>
          <h3 class="profileInfo">{user.email}</h3>
        </div>
      </div>
      <div>
        <div class="updatePic">
          {" "}
          <p>
            click on the phocamera, select your new amazing new amazing profile
            picture, <br />
            then click upload to publish it!
          </p>
          <UpdatePicture
            user={user}
            setUser={setUser}
            authenticate={authenticate}
          />{" "}
        </div>

        <br />
        <p class="textEditForm">
          change your profile info, the click save to publish
        </p>
        <UpdateProfile user={user} authenticate={authenticate} />

        <br />
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
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit} class="editForm">
      <div class="editValue">
        {/* <label>Name</label> */}
        <TextField
          name="name"
          placeholder="Luca"
          value={form.name}
          onChange={handleChange}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
      </div>
      <div class="editValue">
        {/* <label>Surname</label> */}
        <TextField
          name="surname"
          placeholder="surname"
          value={form.surname}
          onChange={handleChange}
          id="outlined-basic"
          label="Surname"
          variant="outlined"
        />
      </div>
      <div class="editValue">
        {/* <label>email</label> */}
        <TextField
          name="email"
          placeholder="email@email.com"
          value={form.email}
          onChange={handleChange}
          id="outlined-basic"
          label="email"
          variant="outlined"
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      {/* <button>Update Profile</button> */}
    </form>
  );
}

function UpdatePicture(props) {
  const classes = useStyles();

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
      {/* <input type="file" onChange={handleChange} /> */}

      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={handleChange}
      />

      <label htmlFor="icon-button-file">
        <IconButton
          // type="submit"
          color="primary"
          aria-label="upload picture"
          component="span"
          onChange={handleChange}
        >
          <PhotoCamera />
        </IconButton>

        <Button
          type="submit"
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>

        {/* <button type="submit"> Update Picture</button> */}
      </label>
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
