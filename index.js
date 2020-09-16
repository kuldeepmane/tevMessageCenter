const mongoose = require("mongoose");

const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const MONGODB_URI =
  "mongodb+srv://owner:password91@cluster0.sptac.mongodb.net/tev?retryWrites=true&w=majority";

const PORT = process.env.PORT || 8080;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connnection successful!"));

app.listen(PORT, () => {
  console.log(`Example app listening at port ${PORT}`);
});

app.post("/saveMesssage", async (req, res) => {
  try {
    const message = mongoose.model("messageCenter", {
      messageTimestamp: { type: Number },
      message: { type: String },
      mobileNumber: { type: Number },
    });

    var newMessage = new message({
      messageTimestamp: req.body.messageTimestamp,
      message: req.body.message,
      mobileNumber: req.body.mobileNumber,
    });

    await newMessage.save();
    res.status(200).send({ success: true, message: "Data Saved" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error.message });
  }
});
