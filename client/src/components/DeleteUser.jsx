import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const DeleteUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/${id}`);
      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Delete user</h1>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default DeleteUser;
