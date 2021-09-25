import express from "express";
import { urlencoded, json } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from 'http';
import mongoose from 'mongoose';
import orderRoute from "./orders/route";

const app = express();
app.use(urlencoded({ extended: true, limit: "500mb" }));
app.use(json({ extended: true, limit: "500mb" }));
app.use(cors());

const api = express.Router();
dotenv.config();
app.use("/api", api);

// add order api route
orderRoute(api);

app.use(express.static('public'));
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })

// our server instance
const server = http.createServer(app);
server.listen(process.env.PORT ?? 3000, () => console.log(`server is running on port ${process.env.PORT}`));