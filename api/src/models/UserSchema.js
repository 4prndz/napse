import mongoose from "mongoose";
import validate from "validate.js";

const { Schema } = mongoose;

const constraints = {
  name: () => {
    const regex = "[-'A-Za-z ]+";
    const constraints = {
      presence: { allowEmpty: false },
      type: "string",
      format: {
        pattern: regex,
        flags: "i",
      },
    };
    return constraints;
  },
  email: () => ({
    presence: { allowEmpty: false },
    email: true,
  }),
};

const UserSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true,
      validate: {
        validator: (name) => !validate.single(name, constraints.name),
        message: (props) => `${props.value} is not a valid first name`,
      },
    },
    last: {
      type: String,
      required: true,
      validate: {
        validator: (name) => !validate.single(name, constraints.name),
        message: (props) => `${props.value} is not a valid last name`,
      },
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => !validate.single(email, constraints.email()),
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  created: Number,
  updated: Number,
  active: Boolean,
  locale: String,
  _internal: Object,
  _tags: Array,
});

UserSchema.pre("save", function (next) {
  const now = Date.now();
  const doc = this;
  doc.updated = now;
  if (!doc.created) {
    doc.created = now;
  }

  if (next) next();
});

UserSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updated: Date.now() });
  if (next) next();
});

export const User = mongoose.model("User", UserSchema);
