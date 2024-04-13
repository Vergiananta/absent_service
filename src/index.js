const dotenv = require("dotenv");
const subscriber = require("./subcribers");
const connection = require("./config/dbConn");
const server = require("../server");
dotenv.config();
async function main() {
  await connection
    .authenticate()
    .then(() => {
      subscriber().catch((err) => console.error(err));
      server.listen(3003, "0.0.0.0", function () {
        if (server.listening) {
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

main();
