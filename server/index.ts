import express, { Express, Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
const KEY = process.env.GOOGLE_MAP_API;
app.use(cors());
app.get("/", async (req: Request, res: Response) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?libraries=places&callback=initMap&query=Jewish+Museum+Berlin&key=${KEY}`
  );
  res.send(response.data);
});

app.listen(5000, () => {
  console.log("server on : localhost:5000");
});
