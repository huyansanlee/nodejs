const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: [
    "http://example.com",
    "https://www.w3schools.com",
    "http://localhost:4200",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// middle ware
app.use("/images", express.static("images"));
app.use(cors(corsOptions)); // all
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // false สนใจ name กับvalue
app.use(require("./controller"));  // เพื่อลิงค์กับไฟล์ controller.js

const PORT = process.env.PORT || 1150;
app.listen(PORT, () => {
  const env = `${process.env.NODE_ENV || "development"}`;
  console.log(`App listening on port ${PORT}`);
  console.log(`App listening on env ${env}`);
  console.log(`Press Ctrl+C to quit. `);
});
