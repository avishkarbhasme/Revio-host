import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

// Fix dirname for ES Modules
const __dirname = path.resolve();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRouter from './routes/user.routes.js';
import videoRouter from "./routes/video.routes.js";
import tweetRouter from './routes/tweet.routes.js';
import subscriptionRouter from "./routes/subscription.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import likeRouter from "./routes/like.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import commentRouter from "./routes/comment.routes.js";
import supportRoutes from "./routes/support.routes.js";
import reportRoutes from "./routes/report.routes.js";


app.use(express.static(path.join(__dirname, "../frontend/dist")));
// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/support", supportRoutes);
app.use("/api/v1/reports", reportRoutes);



// 👉 Corrected catch-all route for Vite SPA
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


export { app };
