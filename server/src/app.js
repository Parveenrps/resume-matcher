import express from "express";
import cors from "cors";
import matchRoutes from "./routes/match.route.js";

const app = express();
app.use(express.static("public"));
app.use(cors({
  origin: "https://resume-matcher-theta.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

app.use("/api", matchRoutes);

export default app;