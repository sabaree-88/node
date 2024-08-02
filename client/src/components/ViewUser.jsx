import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const ViewUser = () => {
  const [user, setUser] = useState([]);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/view");
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <button>
          <Link to={"/add"}>Add user</Link>
        </button>
        <button onClick={handleLogout}>Logout</button>
        <table border={"1px"}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((data) => {
              return (
                <tr key={data._id}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone_number}</td>
                  <td>{data.address}</td>
                  <td>
                    <Link to={`/edit/${data._id}`}>Edit</Link>
                    <Link to={`/delete/${data._id}`}>Delete</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewUser;
