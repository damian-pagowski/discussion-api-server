require("dotenv").config();
const mongoose = require("mongoose");
const DB_URI = process.env.MONGO_URI;
const SERVER_PORT =  process.env.SERVER_PORT || 3310;

const app = require("./app");
mongoose.connect(DB_URI);

app.listen(SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${SERVER_PORT}`);
});