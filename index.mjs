import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import router from "./users/users.controller.mjs";
import jwt from "./_utilities/jwt.mjs";
import errorHandler from "./_utilities/error-handler.mjs";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(jwt());

app.use("/users", router);

app.use(errorHandler);

const port = 4000;
const server = app.listen(port, () => {
  console.log("Server listening on port: " + port);
});
