import express from "express";
import userService from "./user.service.mjs";

const router = express.Router();

const authenticate = (req, res, next) => {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json({"token":user.token})
        : res.status(400).json({ message: "Incorrect username or password" })
    )
    .catch((err) => next(err));
};

const register = (req, res, next) => {
  console.log(req.body);
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
};

const getAll = (req, res, next) => {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
};

const getCurrent = (req, res, next) => {
  userService
    .get(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
};

const get = (req, res, next) => {
  userService
    .get(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
};

const update = (req, res, next) => {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
};

const _delete = (req, res, next) => {
  userService
    ._delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
};

//Routes
router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/", getAll);
router.get("/current", getCurrent);
router.get("/:id", get);
router.put("/:id", update);
router.delete("/:id", _delete);

export default router;
