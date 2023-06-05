import { model, Schema } from "mongoose";

// Initialize our UserSchema
const userSchema = new Schema({
  undelete: {
    type: String,
    unique: true,
    required: false,
  },
  login_code: {
    type: String,
    unique: true,
    required: false,
  },
  captcha_key: {
    type: String,
    unique: true,
    required: false,
  },
  login_source: {
    type: String,
    unique: true,
    required: false,
  },
  gift_code_sku_id: {
    type: String,
    unique: true,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
});
export = model("Users", userSchema);
