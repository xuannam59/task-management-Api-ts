import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database.config";
import routeApiV1 from "./api/v1/routes/index.route";

dotenv.config();
const app: Express = express();
const port: number = 3000;

// connect database
database.connect();

// route api V1
routeApiV1(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})