import { model, Schema } from "mongoose";

// Initialize our UserSchema
const userSchema = new Schema({
  id: {
    type: String,
    unique: true,
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
  data: {
    valid_tokens_since: Date,
  },
});
export default model("Users", userSchema);
