import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import "../Signin/Signin.css";

function Signin() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  //User signin
  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    axios
      .post("/user/signin", form)
      .then((response) => {
        alert(response.data.message);
        const token = response.data.token
        localStorage.setItem("user-token",token);
        setTimeout(() => {
          Navigate('/');
      }, 500);
      })
      .catch((err) => setErrors(err.response.data));
  };
  return (
    <div class="zhioua" onSubmit={onSubmitHandler}>
      <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
        <h1>
          Connexion <i class="fa fa-sign-in" aria-hidden="true"></i>
        </h1>
        <div
          className="p-6 shadow-lg p-3 mb-5 bg-body rounded"
          style={{ backgroundColor: "white" }}
        >
          <form class="form-group">
            <CustomInput
              label="Email"
              placeholder="name@exemple.com"
              type="text"
              name="email"
              icon="fa fa-envelope"
              onChange={onChangeHandler}
              errors={errors.email}
            />
            <CustomInput
              label="Password"
              placeholder="password"
              type="password"
              name="password"
              icon="fa-solid fa-lock"
              onChange={onChangeHandler}
              errors={errors.password}
            />
            <button type="submit">submit</button>
            <p>
              If you dont have an account yet,{" "}
              <Link to="/signup">Creat One</Link> here!
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
