import { logger } from "./application/logging.js";
import { web } from "./application/web.js";

web.listen(4560, () => {
  logger.info("Server running...");
});
