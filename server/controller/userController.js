import { User } from "../model/userSchema.js";
import jwt from "jsonwebtoken'"; // jsonwebtoken for authentication

// create a token for the user to authenticate
const createToken = (_id) => {
  // using jwt.sign method we sign the token for the user it take two parameters one is the id and secret key that is come from the .env file
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "2d", // the token is valid for 2 days
  });
};

export const Login = async (req, res) => {
  // get the email and password from the body
  const { email, password } = req.body;
  try {
    //User.logIn comes from the user model it take two parameters email and password.
    const user = await User.logIn(email, password);
    // create a token for each user with the id and store the token in the variable.
    const token = createToken(user._id);

    // send the response to the client id, email, role and token.
    res.status(200).json({
      user: { _id: user._id, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(400).json({ error: "Invalid credentials" });
  }
};

export const SignUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signUp(name, email, password);

    const token = createToken(user._id);
    res.status(201).json({ user: { _id: user._id, email: user.email }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
