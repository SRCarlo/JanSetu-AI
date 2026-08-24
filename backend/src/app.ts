import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import aiRoutes from "./routes/ai.routes.js";
import requestRoutes from "./routes/request.routes.js";
import priorityRoutes from "./routes/priority.routes.js";
import testRoutes from "./routes/test.routes.js";
import demandRoutes from "./routes/demand.routes.js";
import citizenRequestRoutes from "./routes/citizen-request.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import policyRoutes from "./routes/policy.routes.js";

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    service: "JanSetu AI Backend",
    status: "healthy",
  });
});

app.use("/api/ai", aiRoutes);
app.use("/api/requests", requestRoutes);

app.use("/api/priority", priorityRoutes);
app.use("/api/test", testRoutes);
app.use("/api/demand", demandRoutes);
app.use("/api/citizens/requests", citizenRequestRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/dashboard", policyRoutes);

export default app;
