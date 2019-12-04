import express from "express";
import router from "./server/routes/routes";
import bodyParser from "body-parser";

const app = express();
require('./server/prod')(app);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(router);

app.set('view engine','pug');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} ...`));

export default app;