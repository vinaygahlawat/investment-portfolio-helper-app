import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import hardcodedUsers from "./data/hardcodedUsers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "./lib/prisma";
import { StockRepository } from "./repositories/stock.repository";

interface User {
  _id: string;
  password: string;
}

export interface Users {
  [username: string]: User | undefined; // Allows any string as key, value is User or undefined
}

interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      req.userId = decoded.userId;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
  } else {
    return res.status(401).json({ message: "Not authorized." });
  }
};

export default authMiddleware;

const app = express();
const port: number = parseInt(process.env.port || "5001", 10);
const hostname = "127.0.0.1"; // TODO MVP Pull appropriate hostname from env

// TODO MVP Create more cryptographically challenging secret and store securely in env variable.
const JWT_SECRET = "my_jwt_secret";

const stockRepository = new StockRepository(prisma);

// TODO MVP Configure cors() middleware with appropriate parameters.
app.use(cors());
app.use(express.json());

app.get("/test", (req: Request, res: Response) => {
  res.send("Test endpoint works (w/ CORS)!");
});

app.get(
  "/api/stocks/steps/:ticker",
  authMiddleware as express.RequestHandler,
  async (req: Request, res: Response) => {
    const ticker = req.params.ticker.toUpperCase();
    try {
      console.log(
        `GET request for ${ticker} stock steps (fetching from stock repository)...`
      );
      const stepDataForTicker = await stockRepository.getStockByTicker(ticker);

      if (stepDataForTicker) {
        console.log(
          `Step data for ${ticker}: `,
          JSON.stringify(stepDataForTicker, null, 2)
        );

        const transformedTickerStepData: { date: string; stepVal: number }[] =
          [];
        if (
          stepDataForTicker.stepValues &&
          Array.isArray(stepDataForTicker.stepValues)
        ) {
          for (const step of stepDataForTicker.stepValues) {
            const datestep = {
              date: step.date.toISOString().split("T")[0],
              stepVal: step.stepValue,
            };
            transformedTickerStepData.push(datestep);
          }
        }

        const finalResponseObject = {
          data: transformedTickerStepData,
        };

        console.log(
          `Final response object step data for ${ticker}: `,
          JSON.stringify(finalResponseObject, null, 2)
        );
        res.status(200).json(finalResponseObject);
      } else {
        res.status(404).json({ message: `No data found for ${ticker}.` });
      }
    } catch (error) {
      console.error(`Error fetching stock ${ticker}: `, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

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
          token: token,
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

process.on("beforeExit", async () => {
  console.log("Disconnecting Prisma Client...");
  await prisma.$disconnect();
});

// Handle unexpected shutdown (e.g. Ctrl+C)
process.on("SIGINT", async () => {
  console.log("SIGINT received. Disconnecting Prisma Client...");
  await prisma.$disconnect();
  process.exit(0);
});

// Handle unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at: ", promise, "reason:", reason);
});
