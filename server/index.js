// express is a packgae to send and reciev the request and response
import express from "express";

// mongoose is the package to connect with mongodb
import mongoose from "mongoose";

// Cross-origin resource sharing (CORS) is a browser mechanism which enables controlled access to resources located outside of a given domain.
import cors from "cors";

// dotenv is the package, ensures to use the .env file in the index.js file
import dotEnv from "dotenv";
dotEnv.config();

// import the router
import router from "./routes/crudRoutes.js";
import UserRouter from "./routes/userRoutes.js";

// create instance of express to create a app
const app = express();

// middleware to send the response to the client
app.use(cors());

// middleware to read the request from the body
app.use(express.json());

// get request to the server
app.get("/", (request, response) => {
  return response.json({ message: "From API" });
});

// use the router
app.use("/api", router);
app.use("/user", UserRouter);

// this promise get the mongodb connecting string from the .env file and connect the db
const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.CONNECTION)
  .then(() => {
    // this ensures only run the server when the database is connected
    app.listen(PORT, () => {
      console.log(`Server is running: http://localhost:${PORT}`);
    });
    console.log("Database Connected ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
