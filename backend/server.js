require("module-alias/register");
const { createServer } = require("http");
const app = require("./app");

const { initializeSocketServer } = require("./socket.io");

// * @ config
const logger = require("@config/logger.config");
const { SERVER_PORT, DEVELOPMENT_MODE } = require("@config/index.config");

function startServer() {
  const httpServer = createServer(app);
  initializeSocketServer(httpServer);
  httpServer.listen(SERVER_PORT, () => {
    console.log("Server Mode : ", DEVELOPMENT_MODE);
    console.log("server is started", SERVER_PORT);
    logger.info(`Server Mode : ${DEVELOPMENT_MODE}`);
    logger.info(`Server is running on  : http://localhost:${SERVER_PORT}`);
    console.log(`Server is running on  : http://localhost:${SERVER_PORT}`);
  });
}

startServer();
