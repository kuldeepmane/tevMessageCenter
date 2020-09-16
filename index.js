const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://owner:password91@cluster0.sptac.mongodb.net/tev?retryWrites=true&w=majority";

let dbConn = null;

function connectToDatabase(uri) {
  console.log("=> connect to database");

  if (dbConn) {
    console.log("=> using cached database instance");
    return Promise.resolve(dbConn);
  }

  return mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((db) => {
      dbConn = db;
      return dbConn;
    });
}

exports.saveMessage = async (req, res) => {
  try {
    let db = await connectToDatabase(MONGODB_URI);
    const message = db.model("messageCenter", {
      messageTimestamp: { type: Number },
      message: { type: String },
      mobileNumber: { type: Number },
    });

    var newMessage = new message({
      messageTimestamp: req.body.messageTimestamp,
      message: req.body.message,
      mobileNumber: req.body.mobileNumber,
    });

    let dbResp = await newMessage.save();
    res.status(200).send(dbResp);
  } catch (error) {
    res.status(400).send(error);
  }
};

// saveMessage();           //!! use for local testing only
