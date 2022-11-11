import React from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import "../Signin/Signin.css";
function Signin() {
  return (
    <div class="signin">
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
          />
          <CustomInput
            label="Password"
            placeholder="password"
            type="password"
            name="password"
          />
          <CustomButton label="submit" type="submit" />
          <p>
            If you dont have an account,<a href="/SignUp"> Sign up </a> here!
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
