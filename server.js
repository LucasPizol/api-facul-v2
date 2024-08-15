const app = require("./src/api")

require("dotenv").config()

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`)
})