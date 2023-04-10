const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const configSwaggerJsdoc = require("./config/swaggerJsdoc.json");
const rootRouter = require("./routes/");

const app = express();
const PORT = process.env.PORT || 3000;
const specs = swaggerJsdoc(configSwaggerJsdoc);

// Specify the address of the server where API requests come from
// This will enable CORS for different domain requests
// Alternativelky you can test disabling CORS at browser level via switch
// --disable-web-security
var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const db = require("./models");
db.sequelize.sync();
//// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// parse application/json
app.use(bodyParser.json());

// API routes
app.use("", rootRouter);

// Homepage
app.get("/", function (req, res) {
  res.send(
    `<h2><a href='http://localhost:` +
      PORT +
      `/api-docs'>Go to Swagger UI </a></h2>`
  );
});

app.listen(PORT, () => {
  console.log("App listening on http://localhost:" + PORT);
});
