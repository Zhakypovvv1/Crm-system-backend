import { Schema, model } from "mongoose";

const AuthSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  hash_pass: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: null,
  },
});

AuthSchema.methods.updateName = async function (newName) {
  this.name = newName;
  await this.save();
};

AuthSchema.methods.updateEmail = async function (newEmail) {
  this.email = newEmail;
  await this.save();
};

AuthSchema.methods.updatePassword = async function (newPassword) {
  this.hash_pass = newPassword;
  await this.save();
};

export default model("Auth", AuthSchema);
