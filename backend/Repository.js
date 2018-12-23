
const sql = require("mssql");
const database = require("./Database");

module.exports = {
    executeQuery : function(res, query)
    {
        const connectionPool = new sql.ConnectionPool(database.GetSettings());

        connectionPool.connect().then(pool =>
            pool.request().query(query)).then(result =>
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