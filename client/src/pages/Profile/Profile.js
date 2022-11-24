import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Profile/Profile.css";
function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div class="card p-4">
        <div class=" image d-flex flex-column justify-content-center align-items-center">
          <button class="btn btn-secondary">
            {" "}
            <img src={user.image} alt="user face" height="100" width="100" />
          </button>
          <span class="name mt-3">{user.name}</span>{" "}
           <div class="d-flex flex-row justify-content-center align-items-center gap-2"></div>
          <div class="d-flex flex-row justify-content-center align-items-center mt-3">
            <span class="number">
              e-mail 📧 : <span class="follow">{user.email}</span>
            </span>{" "}
          </div>
          <div class="text mt-3">
            <span>
              If you'd like to support my work , feel free to sponsor me , star
              my repo ⭐ and contact me ❤️‍🔥
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
