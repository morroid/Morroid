import { Router } from "express";
import { generateToken } from "../../utils/generateToken";
import { generateId } from "../../utils/generateId";
import { hashPassword } from "../../utils/hashPassword";
import UserSchema from "../../models/UserSchema";
import { RegisterPayload } from "../../payload/AuthPayload";

const app = Router();

app.post("/register", async (req, res) => {
  let { username, email, password, date_of_birth } = req.body;

  const RegisterConfig: RegisterPayload = {
    email,
    snowflake: generateId(),
    username,
    date_of_birth,
    password,
  };

  const hashedPassword = await hashPassword(password, 12);

  try {
    const user = new UserSchema({
      snowflake: RegisterConfig.snowflake,
      email: RegisterConfig.email,
      username: RegisterConfig.username,
      password: hashedPassword,
      date_of_birth: RegisterConfig.date_of_birth,
    });

    await user.save().then(() => {
      console.log(
        `[ACCOUNTS]: Account Created with the Snowflake ${user.snowflake}`
      );
    });

    res.json({ token: generateToken(user.snowflake as string) });
  } catch (err) {
    throw err;
  }
});

app.post("/login", async (req, res) => {
  // TODO: Rewriting.
});
export = app;
