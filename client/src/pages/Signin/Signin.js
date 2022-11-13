import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";
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

  const onSubmitHandler = (event)=> {
    event.preventDefault();
    axios.post("/user/signin",form)
    .then((response)=>{
      alert(response.data.message)
    })
    .catch((err)=> setErrors(err.response.data)) ;
  }
  return (
    <div class="zhioua-mohamed" onSubmit={onSubmitHandler}>
      <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
        <h1>
          Connexion <i class="fa fa-sign-in" aria-hidden="true"></i>
        </h1>
        <form class="form-group">
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
            If you dont have an account,<Link to="/signup"> Sign up </Link> here!
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
