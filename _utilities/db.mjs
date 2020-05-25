import config from "../config.json";
import mongoose from "mongoose";
import user from "../users/user.model.mjs";

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(
  process.env.MONGODB_URI || config.connectionString,
  connectionOptions
);

mongoose.Promise = global.Promise;
const users = { User: user };
export default users;
