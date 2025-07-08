const express = require("express");
const UserRoutes = require("./users/user.routes");
const AuthUserRoutes = require("./users/auth.routes");

// Route config
const ApiV1Routes = express.Router();

// ----------------------------------------
//  user  routes
// ----------------------------------------
ApiV1Routes.use("/user", UserRoutes);
ApiV1Routes.use("/auth", AuthUserRoutes);

// export the routes
module.exports = ApiV1Routes;
