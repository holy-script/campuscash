import express from "express";
import cors from "cors";
import history from "connect-history-api-fallback";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import path from "path";
import url from "url";
import https from "https";
import fsync from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";
import cookieParser from "cookie-parser";
import { jwtAuth } from "./middleware/jwtAuth.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use(history());
app.use(cookieParser());

app.post("/auth/signup", async (req, res) => {
  const preRegistered = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  if (preRegistered) {
    res.status(409).send({
      message: "User already exists, please Log In!",
    });
  } else {
    const rand = Math.floor(100000 + Math.random() * 900000);
    const msg = {
      to: req.body.email,
      from: process.env.MAIL_ID,
      subject: "CashCampus - Account Verification 👋",
      text: `Welcome to our community! Please enter this code to verify your account - ${rand}`,
    };
    try {
      await sgMail.send(msg);
      try {
        await prisma.user.create({
          data: {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            otp: rand,
          },
        });
        res.status(200).send({
          message: "User was registered successfully!",
        });
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    } catch (err) {
      res.status(500).send({ message: `Email Error: ${err.message}` });
    }
  }
});

app.post("/auth/login", async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    res.status(404).send({
      message: "User does not exist, please Sign Up!",
    });
  } else {
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    passwordIsValid
      ? res
          .status(200)
          .cookie(
            "accessToken",
            jwt.sign({ email: user.email }, secret, {
              expiresIn: 86400 * 7, // 1 week
            }),
            {
              maxAge: 86400 * 1000,
              secure: true,
              sameSite: "none",
            }
          )
          .send({
            email: user.email,
            message: "Successfully Logged in for 24 hours!",
            verified: user.verified,
            onboarded: user.onboarded,
          })
      : res.status(401).send({
          message: "Invalid Password!",
        });
  }
});

app.post("/auth/logout", async (req, res) => {
  res.clearCookie("accessToken");
  res.send({
    message: "Logged Out Successfully!",
  });
});

app.get("/api/validate", [jwtAuth.verifyToken], async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  res.status(200).send({
    verified: user.verified,
    onboarded: user.onboarded,
  });
});

app.post("/api/verify", [jwtAuth.verifyToken], async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  if (user.otp == req.body.otp) {
    await prisma.user.update({
      where: {
        email: req.userEmail,
      },
      data: {
        verified: true,
      },
    });
    res.status(200).send({ message: "Verified!" });
  } else {
    return res.status(401).send({ message: "Wrong Code - Please Retry" });
  }
});

app.post("/api/onboard", [jwtAuth.verifyToken], async (req, res) => {
  try {
    await prisma.user.update({
      where: {
        email: req.userEmail,
      },
      data: {
        onboarded: true,
        name: req.body.name,
        age: req.body.age,
        profile: req.body.profile,
      },
    });
    res.status(200).send({
      message: "Profile completed, going to dashboard...",
    });
  } catch (err) {
    return res.status(404).send({
      message: err.message,
    });
  }
});

app.use("/", async (req, res) => {
  res.send(
    "<div style='text-align: center;position: absolute;transform: translate(-50%, -50%);top: 50%;left: 50%;'><h3>Hello, world!</h3><h4>This is the back end server for <a href='https://cashcamp.us'>Cash Campus</a><h4></div>"
  );
});

https
  .createServer(
    {
      cert: fsync.readFileSync(path.join(__dirname, "certificate.crt")),
      key: fsync.readFileSync(path.join(__dirname, "private.key")),
    },
    app
  )
  .listen(8000);
console.log("Listening at https://localhost:8000");
