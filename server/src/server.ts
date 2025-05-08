import express, { Request, Response } from "express";
import cors from "cors";
import hardcodedStepData from "./data/hardcodedStockStepData";

const app = express();
const port: number = parseInt(process.env.port || "5001", 10);
const hostname = "127.0.0.1"; // TODO MVP Pull appropriate hostname from env

// TODO MVP Configure cors() middleware with appropriate parameters.
app.use(cors());

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

app.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}...`);
});
