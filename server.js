require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDb = require('./config/db')

connectDb();


const app = express();

app.use(express.json());
app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))

const PORT = process.env.PORT | 8000;

app.listen(PORT, () => {
    console.log(`server runnning at ${PORT}`)

})