import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

// create a schema for user with the field name email password and role(role is default) 
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // this indicate all the email are unique it won't allow duplicate
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"], // only allow admin or user
    default: "user", // default value is user
  },
});

// create a statics method for signup and login 
UserSchema.statics.signUp = async function (name, email, password, role = "user") {
  if (!name || !email || !password) {
    throw new Error("All fields must be filled.");
  }
  //validate the email for correct format.
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid.");
  }
  //validate the password for strong password(one uppercase, lowercase letter number and special charecter and minimu 8 charecters) 
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong.");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email is already registered.");
  }

  // encrypt the password to store the password using bcrypt 
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create method create a user
  const user = await this.create({ name, email, password: hash, role });
  return user;
};

UserSchema.statics.logIn = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled.");
  }

  // check the email in the table if it exist it go to the next step for password match
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // using the bcrypt.compare method to compare the stored password and the enterd password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid credentials");
  }

  return user;
};

export const User = mongoose.model("User", UserSchema);
