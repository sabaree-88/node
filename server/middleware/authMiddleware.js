import { User } from "../model/userSchema.js";
import jwt from "jsonwebtoken";

// create a function requireAuth
const requireAuth = async (req, res, next) => {
  // get authorization from the header
  const { authorization } = req.headers;
  //   if the header is not present it show error
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required!" });
  }

  // from the authorization header split the token from the header it looks like this conver the string into array and access the token [Bearer, <Somthing>]
  const token = authorization.split(" ")[1];

  try {
    // verify the token using jwt.verify, id has a header and the header have the token and verify the user
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    req.user = { _id, email: user.email, role: user.role };
    // once it finish continue with the next process
    next(); // this execute the next process
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Request is not authorized." });
  }
};

export default requireAuth;
