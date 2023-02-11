const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const weightRoutes = require("./routes/weight");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const app = express();

mongoose.connect(
  "mongodb://localhost:27017/node_api",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Successfully connected to the MongoDB database.");
    }
  }
);

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/weight", weightRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
