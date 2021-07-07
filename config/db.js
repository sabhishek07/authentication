const mongoose = require("mongoose");

const connectDb = async () => {
    await mongoose.connect(process.env.mongo_Uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,


    });
    console.log("mongdb connected...")
}

module.exports = connectDb;
