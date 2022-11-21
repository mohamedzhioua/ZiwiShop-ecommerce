import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import "../Signup/Signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  //add a User
  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    axios
      .post("/user/signup", form)
      .then((response) => {
        alert(response.data.message);
        // event.target.reset();
        navigate("/signin");
      })
      .catch((err) => setErrors(err.response.data));
  };

  return (
    <div className="container">
      <div className="col-lg-4 col-md-6 col-sm-8 mx-auto">
        <h1>
          Inscription <i className="fa-solid fa-user"></i>
        </h1>
        <div
          className="p-6 shadow-lg p-3 mb-5 bg-body rounded"
          style={{ backgroundColor: "white" }}
        >
          <form class="form-group" onSubmit={onSubmitHandler}>
            <CustomInput
              label="Name"
              placeholder="name"
              type="text"
              name="name"
              icon="fa fa-user"
              onChange={onChangeHandler}
              errors={errors.name}
            />
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
            <button className="submit" type="submit">submit</button>
            <h6>
              Already have an account? <Link to="/signin">Sign in here</Link>
            </h6>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
