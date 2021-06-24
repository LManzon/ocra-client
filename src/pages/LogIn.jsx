import React, { useState } from "react";
import { login } from "../services/auth";
import "./Signup";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./login.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function LogIn({ authenticate, history }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;
  const [error, setError] = useState(null);

  function handleInputChange(event) {
    const { name, value } = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();

    const credentials = {
      email,
      password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
      authenticate(res.data.user);
      history.push(PATHS.HOMEPAGE);
    });
  }
  const classes = useStyles();
  return (
    <div>
      <h1 id="title">Log In</h1>
      <form onSubmit={handleFormSubmission} className="login__form">
        {/* <label htmlFor="input-email">email</label> */}
        <div id="textfield1">
          <TextField
            id="input-email"
            // id="outlined-basic"
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleInputChange}
            required
            label="Enter your email"
            variant="outlined"
            className="loginfield"
          />
        </div>

        {/* <label htmlFor="input-password">Password</label> */}
        <div id="textfield2">
          <TextField
            id="input-password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            required
            minLength="8"
            label="Enter your password"
            variant="outlined"
            className="loginfield"
          />
        </div>

        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}

        <Button
          className="button__submit"
          type="submit"
          variant="outlined"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
