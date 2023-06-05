import express from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken";
import UserSchema from "../../models/UserSchema";
import { RegisterPayload } from "../../payload/AuthPayload";
const app = express();

app.post("/register", async (req, res) => {
  let {
    username,
    email,
    password,
    consent,
    invite,
    fingerprint,
    gift_code_sku_id,
    captcha_key,
    date_of_birth,
  } = req.body;

  const RegisterConfig: RegisterPayload = {
    username,
    email,
    password,
    consent,
    invite,
    fingerprint,
    gift_code_sku_id,
    captcha_key,
    date_of_birth,
  };

  const hashedPassword = await bcrypt.hashSync(RegisterConfig.password, 12);

  const user = new UserSchema({
    email: RegisterConfig.email,
    username: RegisterConfig.username,
    password: hashedPassword,
    date_of_birth: RegisterConfig.date_of_birth,
  });

  await user.save().then(() => {
    console.log(
      `[ACCOUNTS]: ${user.username} has been created with the account id ${user._id}`
    );
  });

  res.json({ token: generateToken(user.email, user.password) });
});

export = app;
