import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Validate from "./validate.js"; // import the validation function
const AddUser = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const [error, setError] = useState({});

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFocus = (event) => {
    //function to capture the change event and validate the form
    const { name } = event.target;
    const validate = Validate(values);
    setError(validate);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validate = Validate(values);
    console.log(validate);
    setError(validate);
    if (
      error.name === "" &&
      error.email === "" &&
      error.phone_number === "" &&
      error.address === ""
    ) {
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
          onKeyUp={handleFocus} // this ensures the validation works on the onkeyup event
          value={values.name}
        />
        <br />
        {error.name && <span style={{ color: "red" }}>{error.name}</span>}
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleInputs}
          onKeyUp={handleFocus}
          value={values.email}
        />
        <br />
        {error.email && <span style={{ color: "red" }}>{error.email}</span>}
        <br />
        <label htmlFor="tel">Phone Number</label>
        <br />
        <input
          type="tel"
          name="phone_number"
          id="tel"
          onChange={handleInputs}
          onKeyUp={handleFocus}
          value={values.phone_number}
        />
        <br />
        {error.phone_number && (
          <span style={{ color: "red" }}>{error.phone_number}</span>
        )}
        <br />
        <label htmlFor="add">Address</label>
        <br />
        <input
          type="text"
          name="address"
          id="add"
          onChange={handleInputs}
          onKeyUp={handleFocus}
          value={values.address}
        />
        <br />
        {error.address && <span style={{ color: "red" }}>{error.address}</span>}
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
