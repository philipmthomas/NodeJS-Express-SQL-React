
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

/*
const Sequelize = require("sequelize");
const connection = require("./settings/connection.json");
const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps : false,
    freezeTableName: true
};
const {DataTypes } = Sequelize;
const sequelize = new Sequelize(
    {
        database : connection.database,
        username : connection.user,
        host: connection.host,
        port: connection.port,
        password: connection.password,
        dialect : "mssql",
        operatorsAliases: false
    }
);

const Item = sequelize.define('item',
    {
        Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        Name : { type: DataTypes.STRING },
        DateEntered : { type : DataTypes.DATE }
    }, DISABLE_SEQUELIZE_DEFAULTS);
*/
