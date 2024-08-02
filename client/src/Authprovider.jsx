import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ViewUser from "./components/ViewUser";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import DeleteUser from "./components/DeleteUser";
import UserDashboard from "./components/UserDashboard";

const Authprovider = () => {
  const { user } = useAuth();

  const ProtectedRoute = ({ children, role }) => {
    if (!user) {
      return <Navigate to="/" />;
    }

    if (role && user.role !== role) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {user && user.role === "admin" && (
        <>
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <ViewUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute role="admin">
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute role="admin">
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/delete/:id"
            element={
              <ProtectedRoute role="admin">
                <DeleteUser />
              </ProtectedRoute>
            }
          />
        </>
      )}

      {user && user.role === "user" && (
        <>
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        </>
      )}
    </Routes>
  );
};

export default Authprovider;
