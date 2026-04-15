import express from "express";
import cors from "cors";
import matchRoutes from "./routes/match.route.js";

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.use("/api", matchRoutes);

export default app;