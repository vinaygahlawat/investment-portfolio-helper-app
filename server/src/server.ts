import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
