require("express-async-errors");
require ("dotenv/config");

const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

const cors = require("cors");
const express = require('express');
const routes = require("./routes")

const path = require('path')

const app = express();
app.use(cors());
app.use(express.json());

app.use("/dishes", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(express.static(path.resolve(__dirname, 'assets', 'images')))


app.use(routes);

app.use (( error, request, response, next ) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));