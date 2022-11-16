import React from "react";
import "../NotFound/NotFound.css";

function NotFound() {
  return (
    <div className="ziwi">
      <h3>404 page not found</h3>
      <i class="fa fa-search fa-xl" aria-hidden="true"></i>

      <h4>
        {"\n"}
        {"\n"}
        {"\n"}We are sorry but the page you are looking for does not exist.
      </h4>
    </div>
  );
}

export default NotFound;
