
const sql = require("mssql");
const database = require("./Database");

module.exports = {
    executeQuery : function(response, query)
    {
        const connectionPool = new sql.ConnectionPool(database.GetSettings());

        connectionPool.connect().then(pool =>
            pool.request().query(query)).then(result =>
        {
            response.setHeader('Access-Control-Allow-Origin','*');
            response.status(200).json(result.recordset);
        }).catch(error =>
            response.status(500).send({message: error})).finally(() =>
            sql.close());
    }
};