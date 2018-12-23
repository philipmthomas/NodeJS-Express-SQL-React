
const sql = require("mssql");
const dbConfig = {
    user: "sa",
    password: "myPassw0rd",
    server: "localhost",
    database: "MyChemicalRomance"
};

module.exports = {
    executeQuery : function(res, query)
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
    }
};