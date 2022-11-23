import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Profile/Profile.css";
function Profile() {
  // const location = useLocation();
  // useEffect(() => console.log("location home page", location));
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div class="card p-4">
        <div class=" image d-flex flex-column justify-content-center align-items-center">
          <button class="btn btn-secondary">
            {" "}
            <img
              src={"https://avatars.githubusercontent.com/u/107249637?v=4"}
              alt="user face"
              height="100"
              width="100"
            />
          </button>
          <span class="name mt-3">{user.name}</span>{" "}
          <span class="idd">Full Stack JavaScript Developer</span>
          <div class="d-flex flex-row justify-content-center align-items-center gap-2"></div>
          <div class="d-flex flex-row justify-content-center align-items-center mt-3">
            <span class="number">
              e-mail : <span class="follow">{user.email}</span>
            </span>{" "}
          </div>
          <div class=" d-flex mt-2">
            {" "}
            <button class="btn1 btn-dark">Edit Profile</button>{" "}
          </div>
          <div class="text mt-3">
            <span>
              Dynamic Software Developer skilled at developing complex
              solutions, possessing string thinking skills, high energy and
              integrity.I am dedicated to constantly self-improve . I am also
              experienced in communication, team management and problem solving
              . Seeking to further improve my skills as the future full stack
              developer at Atmospheric Solutions.
            </span>
          </div>
          <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
            <span>
              <i class="fab fa-twitter"></i>
            </span>{" "}
            <span>
              <i class="fab fa-facebook-f"></i>
            </span>
            <span>
              <i class="fab fa-instagram"></i>
            </span>{" "}
            <span>
              <i class="fab fa-linkedin"></i>
            </span>{" "}
          </div>
          <div class=" px-2 rounded mt-4 date ">
            {" "}
            <span class="join">{new Date().getFullYear()}</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
