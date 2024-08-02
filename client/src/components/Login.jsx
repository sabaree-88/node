import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; //import the context file in the login component to use the login function
const Login = () => {
  const { login, user } = useAuth(); //use the useAuth hook from the context
  const [email, setEmail] = useState(""); // create the state for store the email
  const [password, setPassword] = useState(""); // create the state for store the password
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password); //pass the arguments in the login function to login
      const { user } = res;
      console.log(res);
      if (user.role === "admin") {
        // check the role from the response and based on the role navigate the user to respective dashboards.
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // create a form for login
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /> <br />
        <button type="submit">Submit</button>
        <br /> <br />
        <Link to={"/signup"}>SignUp</Link>
      </form>
    </div>
  );
};

export default Login;
