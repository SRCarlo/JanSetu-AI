import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.port, () => {
  console.log(`
╔══════════════════════════════════════╗
║          JANSETU AI BACKEND          ║
╠══════════════════════════════════════╣
║ Server: http://localhost:${env.port}       ║
║ Health: /api/health                  ║
║ AI:     /api/ai/analyze-request      ║
╚══════════════════════════════════════╝
  `);
});
