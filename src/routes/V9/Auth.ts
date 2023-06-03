import express from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const app = express();

// hard coded for now.

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  fingerprint: string;
  invite: string;
  date_of_birth: string; // yyyy/mm/dd
  gift_code_sku_id: string;
  captcha_key: string;
  consent: boolean;
}

app.post("/register", async (req, res) => {
  const RegisterConfig: RegisterPayload = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    consent: req.body.consent,
    invite: req.body.invite,
    fingerprint: req.body.fingerprint,
    gift_code_sku_id: req.body.gift_code_sku_id,
    captcha_key: req.body.captcha_key,
    date_of_birth: req.body.date_of_birth,
  };

  const hashedPassword = await bcrypt.hash(RegisterConfig.password, 12);

  console.log(`[TEST]: Hashed Password: ${hashedPassword}`);

  const token = jsonwebtoken.sign(RegisterConfig, "DiscordPriv");
  res.json({ token });
});

export = app;
