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

app.get("/photos", async (req: Request, res: Response) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=ATJ83zg0uJmc-dbvq0NTzPwj2vCUxu13Hhum5RWOPqV42VIVrQsObylqrZhxJ3Mnxkfou5Am-k5uDI1pkyEOEaU7PgyejlTsU4QxHzuXPnt_OQ3TJiCcHk2fdXT5GuLu2C_FU7w20oSwds27Lm2HiBf4yuPgoaF5WheajTTSi5VFYAk7gPQQ&key=${KEY}`,
    { responseType: "arraybuffer" }
  );
  // const img = Buffer.from(response.data, "binary").toString("base64");
  const img = Buffer.from(response.data, "binary").toString("base64");
  const html = `<html><body><img src="data:image/jpeg;base64,${img}" /></body></html>`;
  res.send(img);
});

app.listen(5000, () => {
  console.log("server on : localhost:5000");
});
