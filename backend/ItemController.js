const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const API_PORT = 3001;
const app = express();
const router = express.Router();
const sql = require("mssql");

app.use(bodyParser.urlencoded({extended : false }));
app.use(bodyParser.json());
app.use(logger("dev"));

let executeQuery = function(res, query)
{
    let connectionPool = new sql.ConnectionPool(dbConfig);

    connectionPool.connect().then(pool =>
    {
       return pool.request().query(query)
    }).then(result =>
    {
        let rows = result.recordset;
        res.setHeader('Access-Control-Allow-Origin','*');
        res.status(200).json(rows);
        sql.close();
    }).catch(err =>
    {
        res.status(500).send({message : err});
        sql.close();
    });
};

// curl http://localhost:3001/api/items
router.get("/Items", (request, response) => {
    const query = `select * from item`;

    executeQuery(response, query);
});

// curl http://localhost:3001/api/items/1
router.get("/Items/:id", (request, response) =>
{
    const query = `select * from item where id = ${request.params.id}`;

    executeQuery(response, query);
});

// curl --data "name=Pencil"  http://localhost:3001/api/items
router.post("/Items", (request, response) =>
{
    const query = `insert into item ([name]) values (\'${request.body.name}\')`;

    executeQuery(response, query);
});

const dbConfig = {
    user: "sa",
    password: "myPassw0rd",
    server: "localhost",
    database: "MyChemicalRomance"
};


app.use("/api", router);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));