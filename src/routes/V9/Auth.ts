import { Router } from "express";
import { generateToken } from "../../utils/generateToken";
import { generateId } from "../../utils/generateId";
import { hashPassword } from "../../utils/hashPassword";
import { comparePassword } from "../../utils/comparePassword";
import { RegisterPayload } from "../../payload/AuthPayload";
import { SettingsPayload } from "../../payload/SettingsPayload";
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
    console.log(generateToken(user.id));
  } catch (err) {
    throw err;
  }
});

app.post("/login", async (req, res) => {
  let { login, password } = req.body;

  const user = await UserSchema.findOne({
    email: login,
  });

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
        settings: {
          locale: "en",
          theme: "dark",
          // index: undefined,
        },
      });
    }
  } catch (err) {
    throw err;
  }
});
app.get("/location-metadata", async (req, res) => {
  res.json({
    consent_required: false,
    country_code: "US",
    promotional_email_opt_in: {
      required: false,
      pre_checked: false,
    },
  });
});
export = app;
