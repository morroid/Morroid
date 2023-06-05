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
app.post("/login", async (req, res) => {
  let {
    login,
    password,
    undelete,
    login_code,
    captcha_key,
    login_source,
    gift_code_sku_id,
  } = req.body;

  const user = await UserSchema.findOne({
    login,
    password,
    undelete,
    login_code,
    captcha_key,
    login_source,
    gift_code_sku_id,
  });

  if (!user) {
    console.error("Failed to login.");
    return res.status(400).json({ status: 400, error: "User not found" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = generateToken(user.email, user.password);
    console.log(`${user.username} has logged in with the id ${user.id}`);

    return res.status(200).json({ status: 200, token });
  } else {
    return res
      .status(400)
      .json({ status: 400, error: "Invalid Password or Usernmae" });
  }
});
export = app;
