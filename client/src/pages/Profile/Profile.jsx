import "../Profile/Profile.css";
function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div className="card p-4">
        <div className=" image d-flex flex-column justify-content-center align-items-center">
          <button className="btn btn-secondary">
            {" "}
            <img src={user.image} alt="user face" height="100" width="100" />
          </button>
          <span className="name mt-3">{user.name}</span>{" "}
          <div className="d-flex flex-row justify-content-center align-items-center gap-2"></div>
          <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <span className="number">
              e-mail 📧 : <span className="follow">{user.email}</span>
            </span>{" "}
          </div>
          <div className="text mt-3">
            <span>
              If you'd like to support my work , feel free to sponsor me , star
              my repo ⭐ and contact me ❤️‍🔥
            </span>
          </div>
          <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
            <span>
              <i className="fab fa-twitter"></i>
            </span>{" "}
            <span>
              <i className="fab fa-facebook-f"></i>
            </span>
            <span>
              <i className="fab fa-instagram"></i>
            </span>{" "}
            <span>
              <i className="fab fa-linkedin"></i>
            </span>{" "}
          </div>
          <div className=" px-2 rounded mt-4 date ">
            {" "}
            <span className="join">{new Date().getFullYear()}</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
