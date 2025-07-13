const { Server } = require("socket.io");
const { CORS_ALLOW_ORIGINS } = require("./src/config/index.config");
const { user_emit_listeners } = require("@/constants/socket.constants");
const userModel = require("@/schema/users/user.model");
const activeUsersModel = require("@/schema/users/activeUsers.model");

let ioInstance = null;

function initializeSocketServer(httpServer) {
  // const serverHttp = createServer(app);
  ioInstance = new Server(httpServer, { cors: CORS_ALLOW_ORIGINS });
  ioInstance.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // user joins their room
    socket.on(user_emit_listeners.joinRoom, async (userId) => {
      if (!userId) {
        console.error("User ID is required to join a room.");
        return;
      }
      let userExist = await userModel.findById(userId);
      if (!userExist) {
        console.error(`User with ID ${userId} does not exist.`);
        return;
      }
      let activeUser = await activeUsersModel.findOneAndUpdate(
        { user: userId },
        { isOnline: true, socketId: socket.id },
        { new: true }
      );
      if (!activeUser) {
        activeUser = await activeUsersModel.create({
          user: userId,
          isOnline: true,
          socketId: socket.id,
        });
      }
      socket.join(userId);
      socket.emit(user_emit_listeners.me, activeUser);
      socket.broadcast.emit(user_emit_listeners.newUserJoined, activeUser);
      console.log(`user ${userId} -> ${userId} joined room`);
    });

    // Client disconnect
    socket.on("disconnect", async () => {
      console.log("Client disconnected:", socket.id);

      setTimeout(async () => {
        let userLeft = await activeUsersModel.findOneAndDelete({
          socketId: socket.id,
        });

        if (userLeft) {
          console.log(`User left: ${userLeft.user}`);
          socket.broadcast.emit(user_emit_listeners.userDisconnected, userLeft);
        }
      }, 10000);
    });
  });
  // return serverHttp;
}

const getSocketIO = () => {
  if (!ioInstance) {
    throw new Error("Socket.IO is not initialized.");
  }
  return ioInstance;
};

module.exports = {
  initializeSocketServer,
  getSocketIO,
};
