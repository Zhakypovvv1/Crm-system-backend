import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

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

AuthSchema.pre("save", async function (next) {
  if (!this.isModified("hash_pass")) return next();

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.hash_pass = await bcrypt.hash(this.hash_pass, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

AuthSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.hash_pass);
  } catch (error) {
    throw new Error(error);
  }
};

AuthSchema.methods.updatePassword = async function (newPassword) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.hash_pass = await bcrypt.hash(newPassword, salt);
    await this.save();
  } catch (error) {
    throw new Error(error);
  }
};

export default model("Auth", AuthSchema);
