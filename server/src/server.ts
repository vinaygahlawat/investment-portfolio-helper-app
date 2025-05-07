// import express, { Request, Response } from "express";
// import cors from "cors";

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type, Authorization",
//   })
// );

// app.get("/test", (req: Request, res: Response) => {
//   res.send("Test endpoint works!");
// });

// app.get("/api/stocks/steps/:ticker", (req: Request, res: Response) => {
//   const ticker = req.params.ticker.toUpperCase();

//   res.status(200).json({ message: `No data found for ${ticker}.` });
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}...`);
// });
import express, { Request, Response } from "express";
import cors from "cors";
import hardcodedStepData from "./data/hardcodedStockStepData";

const app = express();
// const port = process.env.PORT || 5000;
const port = 5001;
const hostname = "127.0.0.1"; // Explicitly define the hostname

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
