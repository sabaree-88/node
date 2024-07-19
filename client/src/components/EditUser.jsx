import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/view/${id}`)
      .then((res) => {
        const result = res.data;
        setValues({
          name: result.name,
          email: result.email,
          phone_number: result.phone_number,
          address: result.address,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
      const response = await axios.put(`http://localhost:8000/api/edit/${id}`, {
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
        address: values.address,
      });
      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      setError({ err: "Failed to update user. Please try again." });
      console.error("Error updating data:", err);
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

export default EditUser;
