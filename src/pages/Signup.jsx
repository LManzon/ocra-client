import React, { useState } from "react";
import { signup } from "../services/auth";
import "./auth.css";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";

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

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleFormSubmission} className="auth__form">
        <label htmlFor="input-name">Name</label>
        <input
          id="input-name"
          type="text"
          name="name"
          placeholder="Luca"
          value={name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="input-surname">Surname</label>
        <input
          id="input-surname"
          type="text"
          name="surname"
          placeholder="Manzon"
          value={surname}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="input-email">email</label>
        <input
          id="input-email"
          type="email"
          name="email"
          placeholder="info@ocra.com"
          value={email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}

        <button className="button__submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
