/** @format */

// create express js server
const apis = require("./config/api");

const PORT = process.env.PORT || 8080;
apis.app.listen(PORT, function () {
  console.log("server connected to port " + PORT);
});
