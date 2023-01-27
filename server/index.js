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

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

dotenv.config();

const app = express();
const prisma = new PrismaClient();

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

app.use("/", async (req, res) => {
  res.send(
    "<div style='text-align: center;position: absolute;transform: translate(-50%, -50%);top: 50%;left: 50%;'><h3>Hello, world!</h3><h4>This is the back end server for <a href='https://campuscash.us'>Campus Cash</a><h4></div>"
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

// (async () => {
//   try {
//     console.log(await prisma.widget.create({ data: {} }));
//   } catch (err) {
//     console.error("error executing query:", err);
//   } finally {
//     prisma.$disconnect();
//   }
// })();
