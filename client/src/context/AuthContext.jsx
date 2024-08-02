import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(); //initialize the create context hook for login, logout and signin

export const AuthProvider = ({ children }) => {
  // children props inside this context only allow the user after login to the system
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      }); // post the email and password to the db for login
      setUser(res.data.user); // store the response in the user state variable
      localStorage.setItem("user", JSON.stringify(res.data.user)); // set the user data into the localstorage
      localStorage.setItem("token", res.data.token); // set the token to the localstorage this token get from the response
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
      // set default header for login
      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
      // navigate the user and admin based on the user role, role comes in the response from the API
    } catch (error) {
      console.error("Login error:", error.response?.data); // throw the error if login failed
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  // this function only store the user information
  const signup = async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:8000/user/signup", {
        name,
        email,
        password,
      });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
      navigate("/");
    } catch (error) {
      throw new Error(error.response?.data?.error || "Signup failed");
    }
  };
  // this function remove the token, user and header from the localstorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

  return (
    //send the function through props
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); //export the context
