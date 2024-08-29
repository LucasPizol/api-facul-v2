const app = require("./src/api");
const env = require("./src/main/env");

app.listen(env.port, () => {
  console.log(`Listening to port ${env.port}`);
});
