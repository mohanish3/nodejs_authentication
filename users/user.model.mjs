import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  createdat: { type: Date, default: Date.now },
  modifiedat: { type: Date, default: Date.now },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.hash;
  },
});

const mongoModel = mongoose.model("User", schema);

export default mongoModel;
