import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: Object,
    default: {
      first: String,
      last: String,
    },
  },

  email: String,
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
