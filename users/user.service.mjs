import config from "../config.json";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../_utilities/db.mjs";

const User = db.User;

const authenticate = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ sub: user._id }, config.secret);
    return {
      ...user.toJSON(),
      token,
    };
  }
};

const getAll = async () => {
  console.log("Get all users");
  return await User.find();
};

const get = async (id) => {
  return await User.findById(id);
};

const create = async (userParam) => {
  if (await User.findOne({ email: userParam.email })) {
    throw 'Email "' + userParam.email + '" is already taken';
  }
  if (await User.findOne({ mobile: userParam.mobile })) {
    throw 'Mobile "' + userParam.mobile + '" is already taken';
  }

  const user = new User(userParam);

  if (userParam.password) {
    user.password = bcrypt.hashSync(userParam.password);
  }

  await user.save();
};

const update = async (id, userParam) => {
  const user = await User.findById(id);

  if (!user) throw "User not found";

  if (
    user.email !== userParam.email &&
    (await User.findOne({ email: userParam.email }))
  ) {
    throw 'Email "' + userParam.email + '" is already taken';
  }
  if (
    user.mobile !== userParam.mobile &&
    (await User.findOne({ mobile: userParam.mobile }))
  ) {
    throw 'Mobile "' + userParam.mobile + '" is already taken';
  }

  if (userParam.password) {
    userParam.password = bcrypt.hashSync(userParam.password);
    userParam.modifiedat = Date.now();
  }

  Object.assign(user, userParam);

  await user.save();
};

const _delete = async (id) => {
  await User.findByIdAndRemove(id);
};

export default {
  authenticate,
  getAll,
  get,
  create,
  update,
  delete: _delete,
};
