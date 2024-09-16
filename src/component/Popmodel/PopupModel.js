import React from "react";
import { useSelector } from "react-redux";
import "./PopupModel.css";

const PopupModel = ({ id, setShowPopup }) => {
  const allusers = useSelector((state) => state.userDetail.users);
  const singleUser = allusers.find((ele) => ele.id === id);
  // console.log("singleuser", singleUser);

  if (!singleUser) {
    return null; // Or some fallback UI if the user is not found
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setShowPopup(false)}>Close</button>
        <h2>Title : {singleUser.title}</h2>
        <h3> Description : {singleUser.description}</h3>
        <h4>Status : {singleUser.status}</h4>
      </div>
    </div>
  );
};

export default PopupModel;