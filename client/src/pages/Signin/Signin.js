import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Signin/Signin.css";
import FacebookAuth from "../../components/FacebookAuth/FacebookAuth";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
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
    event.preventDefault();
    axios
      .post("/user/signin", form)
      .then((response) => {
        const token = response.data.token;
        // Save token to localStorage
        localStorage.setItem("user-token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success(`${response.data.message}`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        console.log(response);
        setTimeout(() => {
          window.location.reload(false);
          navigate("/",{state:{name:'hhhhhh'}});
        }, 1000);
      })
      .catch((err) => setErrors(err.response.data));
  };
  const informParent = (response) => {
    const token = response.data.token;
    // Save token to localStorage
    localStorage.setItem("user-token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(response.data.user));
    toast.success(`${response.data.message}`, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    setTimeout(() => {
      window.location.reload(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="container" onSubmit={onSubmitHandler}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />{" "}
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
            <button className="submit" type="submit">
              sign in
            </button>
            <div class="row px-3 mb-4">
              <div class="line"></div>
              <small class="or text-center">Or</small>
              <div class="line"></div>
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
}

export default Signin;
