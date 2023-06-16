import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import "../Signin/Signin.css";
import FacebookAuth from "../../components/FacebookAuth/FacebookAuth";
 
function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  //User signin
  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = (event) => {
    setIsLoading(true);
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/user/signin`, form)
      .then((response) => {
        const token = response.data.token;
        // Save token to localStorage
        localStorage.setItem("user-token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(response.data.user));

        window.location.reload(false);
        setTimeout(() => {
          navigate("/");
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setErrors(err.response.data);
        setIsLoading(false);
      });
  };
  const informParent = (response) => {
    setIsLoading(true);
    const token = response.data.token;
    // Save token to localStorage
    localStorage.setItem("user-token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(response.data.user));
    window.location.reload(false);
    setTimeout(() => {
      navigate("/");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container" onSubmit={onSubmitHandler}>
      <div className="col-lg-4 col-md-6 col-sm-8 mx-auto">
        <h1>
          Connexion <i className="fa fa-sign-in" aria-hidden="true"></i>
        </h1>
        <div
          className="p-6 shadow-lg p-3 mb-5 bg-body rounded"
          style={{ backgroundColor: "white" }}
        >
          <form className="form-group">
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
              password
            />
            <button className="submit" type="submit">
              sign in
            </button>
            <div className="row px-3 mb-4">
              <div className="line"></div>
              <small className="or text-center">Or</small>
              <div className="line"></div>
            </div>

            <div className="d-flex flex-row mb-3 justify-content-evenly social-media">
              <GoogleAuth informParent={informParent} />
              <FacebookAuth informParent={informParent} />
            </div>
            <h6>
              If you dont have an account yet,{" "}
              <Link to="/signup">Creat One</Link> here!
            </h6>
          </form>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="App">{isLoading ? <LoadingSpinner /> : renderSignin}</div>
  // );
}

export default Signin;
