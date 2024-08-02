import React from "react";
import { useAuth } from "../context/AuthContext";
const UserDashboard = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div>UserDashboard</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default UserDashboard;
