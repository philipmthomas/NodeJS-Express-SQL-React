const common = require("./Common");
const {router, repository} = common.GetSettings();

// curl http://localhost:3001/api/items
router.get("/Items", (request, response) => {
    sequelize
        .authenticate()
        .then(() => {
            console.log("connection has been established successfully.");

           Item.findAll().then(users => { response.json({success : true, data : users }) });
        })
        .catch(err => {
            console.error("Unable to connect to the database.", err);
        });

});

// curl http://localhost:3001/api/items/1
router.get("/Items/:id", (request, response) => repository.executeQuery(response, `select * from item where id = ${request.params.id}`));

// curl --data "name=Pencil"  http://localhost:3001/api/items
router.post("/Items", (request, response) => repository.executeQuery(response, `insert into item ([name]) values (\'${request.body.name}\')`));

const Sequelize = require("sequelize");
const connection = require("./settings/connection.json");
const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true
};
const {DataTypes} = Sequelize;
const sequelize = new Sequelize(
    {
        database: connection.database,
        username: connection.user,
        host: connection.host,
        //port: connection.port,
        password: connection.password,
        dialect: "mssql",
        operatorsAliases: false,
        dialectOptions: {
            encrypt: true
        },
        pool:
            {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
    }
);

const Item = sequelize.define('item',
    {
        Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        Name: {type: Sequelize.STRING},
        DateEntered: {type: Sequelize.DATE}
    }, DISABLE_SEQUELIZE_DEFAULTS);
