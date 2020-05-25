import expressJwt from "express-jwt";
import config from "../config.json";
import userService from "../users/user.service.mjs";

const jwt = () => {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: ["/users/authenticate", "/users/register"],
  });
};

const isRevoked = async (req, payload, done) => {
  const user = await userService.get(payload.sub);
  console.log(req);
  console.log(payload);

  if (!user) {
    return done(null, true);
  }

  done();
};

export default jwt;
