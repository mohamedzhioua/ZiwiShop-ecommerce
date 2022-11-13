import React, { useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import "../Signup/Signup.css";
import axios from "axios";

function Signup() {
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
        console.log('------->',response);
      })
      .catch((err) => setErrors(err.response.data));
  };

  return (
    <div class="signup">
      <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
        <h1>
          Inscription <i class="fa-solid fa-user"></i>
        </h1>
        <form class="form-group" onSubmit={onSubmitHandler}>
          <CustomInput
            label="Name"
            placeholder="name"
            type="text"
            name="name"
            onChange={onChangeHandler}
            errors={errors.name}
          />
          <CustomInput
            label="Email"
            placeholder="name@exemple.com"
            type="text"
            name="email"
            onChange={onChangeHandler}
            errors={errors.email}
          />
          <CustomInput
            label="Password"
            placeholder="password"
            type="password"
            name="password"
            onChange={onChangeHandler}
            errors={errors.password}
          />
          <button type="submit">submit</button>
          <p>
            Already have an account? <a href="/">Sign in here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
