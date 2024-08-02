import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const [error, setError] = useState(null);

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/add", {
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
        address: values.address,
      });
      if (response.status === 200) {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      if (err.response) {
        setError({
          err: `Failed to add user. Status code: ${err.response.status}. Error message: ${err.response.data.error}`,
        });
      } else {
        setError({ err: "Failed to add user. Please try again." });
      }
      console.error("Error posting data:", err);
    }
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error.err}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleInputs}
          value={values.name}
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleInputs}
          value={values.email}
        />
        <br />
        <label htmlFor="tel">Phone Number</label>
        <br />
        <input
          type="tel"
          name="phone_number"
          id="tel"
          onChange={handleInputs}
          value={values.phone_number}
        />
        <br />
        <label htmlFor="add">Address</label>
        <br />
        <input
          type="text"
          name="address"
          id="add"
          onChange={handleInputs}
          value={values.address}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
