const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const multer = require("multer");
const morgan = require("morgan");

const connectDatabase = require("./src/configs/db.config");
const morganConfig = require("./src/configs/morgan.config");
const multerConfig = require("./src/configs/multer.config");
require("./src/services/cache.service");

dotenv.config();
connectDatabase();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("combined", { stream: morganConfig.accessLogStream }));
app.use(multer(multerConfig.options).fields(multerConfig.fields));
app.use(
    "/images",
    (req, res, next) => {
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Cross-Origin-Resource-Policy", "same-site");
        next();
    },
    express.static(path.join(__dirname, "public", "images"))
);

app.use("/api", require("./src/routes/index"));
app.use(require("./src/routes/error-handler.route"));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
