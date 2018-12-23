const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const API_PORT = 3001;
const app = express();
const router = express.Router();
let tools = require("./tools");

app.use(bodyParser.urlencoded({extended : false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// curl http://localhost:3001/api/items
router.get("/Items", (request, response) => {
    const query = `select * from item`;

    tools.executeQuery(response, query);
});

// curl http://localhost:3001/api/items/1
router.get("/Items/:id", (request, response) =>
{
    const query = `select * from item where id = ${request.params.id}`;

    tools.executeQuery(response, query);
});

// curl --data "name=Pencil"  http://localhost:3001/api/items
router.post("/Items", (request, response) =>
{
    const query = `insert into item ([name]) values (\'${request.body.name}\')`;

    tools.executeQuery(response, query);
});

app.use("/api", router);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));