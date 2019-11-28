import express from "express";
import router from "./server/routes/routes";

const app = express();

const bodyParser = require("body-parser");
require('./server/prod')(app);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(router);

app.set('view engine','pug');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} ...`));
export default app;