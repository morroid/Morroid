import { Router } from "express";
import { generateToken } from "../../utils/generateToken";
import { generateId } from "../../utils/generateId";
import { hashPassword } from "../../utils/hashPassword";
import { comparePassword } from "../../utils/comparePassword";
import { RegisterPayload } from "../../payload/AuthPayload";
import UserSchema from "../../models/UserSchema";

const app = Router();

app.post("/register", async (req, res) => {
  let { username, email, password, date_of_birth } = req.body;

  const RegisterConfig: RegisterPayload = {
    email,
    id: generateId(),
    username,
    date_of_birth,
    password,
  };

  const hashedPassword = await hashPassword(password, 12);

  try {
    const user = new UserSchema({
      id: RegisterConfig.id,
      email: RegisterConfig.email,
      username: RegisterConfig.username,
      password: hashedPassword,
      date_of_birth: RegisterConfig.date_of_birth,
    });

    await user.save().then(() => {
      console.log(`[ACCOUNTS]: Account Created with the Snowflake ${user.id}`);
    });

    res.json({ token: generateToken(user.id) });
  } catch (err) {
    throw err;
  }
});

app.post("/login", async (req, res) => {
  let { login, password, settings } = req.body;

  const user = await UserSchema.findOne({
    email: login,
  });

  const userId = generateId();

  try {
    if (!user) {
      return res.status(403).json({ error: "Failed to find user." });
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      return res.status(403).json({ error: "Email or Password is incorrect." });
    } else {
      return res.json({
        token: generateToken(user.id),
        ...settings,
      });
    }
  } catch (err) {
    throw err;
  }
});
export = app;
