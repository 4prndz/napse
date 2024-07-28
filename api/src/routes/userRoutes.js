import express from "express";
import mongoose from "mongoose";
import { UserService } from "../services/user/UserService.js";
import { PayloadError, InternalError } from "../errors/Errors.js";

const userRouter = express.Router();

export const userRoutes = (router) => {
  router.use("/user", userRouter);

  userRouter.get("/:_id", async (req, res) => {
    const id = req.params._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json(new PayloadError(`_id`, "Invalid userId", "user"));
      return;
    }

    UserService.get(id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) =>
        res.status(500).json(new InternalError("Failed to get user", "user")),
      );
  });

  userRouter.post("/", async (req, res) => {
    UserService.create(req.body)
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        const service = "user";
        // Error code 400
        if (err.code === 11000) {
          const msg = [`User with ${err.keyValue.email} already exists`];
          const key = Object.keys(err.keyPattern)[0] || "email";
          res.status(400).json(new PayloadError(key, msg, service));
          return;
        }

        // Error Validation Errors
        if (err.name === "ValidationError") {
          const msg = Object.values(err.errors).map((e) => e.message);
          const key = Object.keys(err.errors);
          res.status(400).json(new PayloadError(key, msg, service));
          return;
        }

        return res
          .status(500)
          .json(new InternalError(`Failed to create a user`, "internal"));
      });
  });

  userRouter.put("/:_id", async (req, res) => {
    const id = req.params._id;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json(new PayloadError(`_id`, "Invalid userId", "user"));
      return;
    }

    UserService.update(id, data)
      .then((user) => res.status(200).json(user))
      .catch((err) =>
        res
          .status(500)
          .json(new InternalError("Failed to update user", "user")),
      );
  });

  userRouter.delete("/:_id", (req, res) => {
    const id = req.params._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json(new PayloadError(`_id`, "Invalid userId", "user"));
      return;
    }

    UserService.delete(id)
      .then((user) => {
        if (user) {
          res.status(200).json({
            message: `User with id ${id} has been deleted`,
          });
        } else {
          res.status(404).json({
            message: `User with id ${id} not found`,
          });
        }
      })
      .catch((err) =>
        res
          .status(500)
          .json(new InternalError("Failed to delete user", "user")),
      );
  });
};
