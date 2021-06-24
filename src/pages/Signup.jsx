import React, { useState } from "react";
import { signup } from "../services/auth";
import "./auth.css";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import "./signup.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Signup({ authenticate, history }) {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const { name, surname, email, password } = form;
  const [error, setError] = useState(null);

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      name,
      surname,
      email,
      password,
    };
    signup(credentials).then((res) => {
      if (!res.status) {
        // unsuccessful signup
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: "Signup was unsuccessful! Please check the console.",
        });
      }
      // successful signup
      localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
      authenticate(res.data.user);
      history.push(PATHS.HOMEPAGE);
    });
  }
  const classes = useStyles();
  return (
    <div id="signUpPage">
      <h1 id="title">Sign Up</h1>
      <form onSubmit={handleFormSubmission} className="signup__form">
        {/* <label htmlFor="input-name">Name</label> */}
        <div id="textFieldSignup">
          <TextField
            id="input-name"
            type="text"
            name="name"
            placeholder="Luca"
            value={name}
            onChange={handleInputChange}
            required
            label="Name"
            variant="outlined"
          />
        </div>

        {/* <label htmlFor="input-surname">Surname</label> */}
        <div id="textFieldSignup">
          <TextField
            id="input-surname"
            type="text"
            name="surname"
            placeholder="Manzon"
            value={surname}
            onChange={handleInputChange}
            required
            label="Surname"
            variant="outlined"
          />
        </div>

        {/* <label htmlFor="input-email">email</label> */}
        <div id="textFieldSignup">
          <TextField
            id="input-email"
            type="email"
            name="email"
            placeholder="info@ocra.com"
            value={email}
            onChange={handleInputChange}
            required
            label="Email"
            variant="outlined"
          />
        </div>

        {/* <label htmlFor="input-password">Password</label> */}
        <div id="textFieldSignup">
          <TextField
            id="input-password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            required
            minLength="8"
            label="Password"
            variant="outlined"
          />
        </div>

        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}

        {/* <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}
          type="submit"
        >
          Submit
        </Button> */}
        <Button
          variant="outlined"
          color="primary"
          // className={classes.button}
          // endIcon={<Icon>send</Icon>}
          type="submit"
        >
          Signup
        </Button>
      </form>
    </div>
  );
}
