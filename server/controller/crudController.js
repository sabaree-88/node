import { CRUD } from "../model/crudSchema.js"; // import the model

// function has two parameters request and response
export const viewUser = async (request, response) => {
  try {
    // get the users from the CRUD table using the mongoose find method
    const result = await CRUD.find({});
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send(error);
  }
};

// this function asynchornus function store the details
export const addUser = async (request, response) => {
  try {
    // for the add user get the request from the body
    // destructure the fileds,this line get the fields from the body
    const { name, email, phone_number, address } = request.body;

    // create a object to store the user info
    const users = { name, email, phone_number, address };

    // insert the users data into the table/collection by using the CRUD model
    // CRUD.create method insert the users into the table/collection
    const result = await CRUD.create(users);
    if (!result) {
      response.status(402).send({ message: "Error creating the user" });
    }
    // send the response to the client.
    return response.status(200).send(result);
  } catch (error) {
    return response.status(400).send("test");
  }
};

// for edit and delete user we need the id of the user that is get from the req.params
export const editUser = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, email, phone_number, address } = request.body;

    // create a object to store the user info
    const users = { name, email, phone_number, address };

    // using the findByIdAndUpdate method and pass the id and users to update the user
    const updatedUser = await CRUD.findByIdAndUpdate(id, users, {
      new: true,
    });
    if (!updatedUser) {
      return response.status(404).json({ message: "User not found!" });
    }
    // send the response to the client
    return response.status(200).send(updatedUser);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

export const deleteUser = async (request, response) => {
  try {
    const { id } = request.params;
    // using the findByIdAndDelete method and pass the id and users to delete the user
    const result = await CRUD.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "User not found!" });
    }
    return response.status(200).send({ message: "User deleted successfully!" });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: error.message });
  }
};

// create a new function that get the user by id

export const getUserID = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await CRUD.findById(id);
    if (!result) {
      return response.status(404).send({ message: "User not found!" });
    }
    return response.status(200).send(result);
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: error.message });
  }
};
