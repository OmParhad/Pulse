import express from "express";
import cors from "cors";
import feedRoutes from "./routes/feed";
import healthRoutes from "./routes/health";
import searchRoutes from "./routes/search";
import categoryRoutes from "./routes/category";
import trendingRoutes from "./routes/trending";
import statsRoutes from "./routes/stats";
import systemRoutes from "./routes/system";
import { refreshFeeds } from "./services/feedmanager";
refreshFeeds();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/feed", feedRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/trending", trendingRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/system", systemRoutes);

app.get("/", (req, res) => {
  res.json({
    app: "Pulse",
    version: "0.1.0"
  });
});

setInterval(() => {

    refreshFeeds();

}, 10 * 60 * 1000);

app.use("/api/health", healthRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Pulse Backend running on http://localhost:${PORT}`);
});