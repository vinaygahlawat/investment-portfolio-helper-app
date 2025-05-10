import express, { Request, Response } from "express";
import cors from "cors";
import hardcodedStepData from "./data/hardcodedStockStepData";
import hardcodedUsers from "./data/hardcodedUsers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
  _id: string;
  password: string;
}

export interface Users {
  [username: string]: User | undefined; // Allows any string as key, value is User or undefined
}

const app = express();
const port: number = parseInt(process.env.port || "5001", 10);
const hostname = "127.0.0.1"; // TODO MVP Pull appropriate hostname from env

// TODO MVP Create more cryptographically challenging secret and store securely in env variable.
const JWT_SECRET = "my_jwt_secret";

// TODO MVP Configure cors() middleware with appropriate parameters.
app.use(cors());
app.use(express.json());

app.get("/test", (req: Request, res: Response) => {
  res.send("Test endpoint works (w/ CORS)!");
});

app.get("/api/stocks/steps/:ticker", (req: Request, res: Response) => {
  const ticker = req.params.ticker.toUpperCase();
  const stepDataForTicker = hardcodedStepData[ticker];

  if (stepDataForTicker) {
    res.status(200).json(stepDataForTicker);
  } else {
    res.status(404).json({ message: `No data found for ${ticker}.` });
  }
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const loginUser = hardcodedUsers[username];

  try {
    if (loginUser) {
      const passwordMatch = await bcrypt.compare(password, loginUser.password);
      if (passwordMatch) {
        const payload = { userId: loginUser._id, username: username };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
          message: `User ${username} logged in successfully. Token: ${token}`,
        });
      } else {
        res.status(401).json({ message: `Invalid credentials.` });
      }
    } else {
      res.status(401).json({ message: `Invalid credentials.` });
    }
  } catch (err) {
    console.error("Error with login: ", err);
  }
});

app.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}...`);
});
