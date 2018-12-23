const common = require("./Common");
const { router } = common.GetSettings();
const model = require("./Models");
const { Item, sequelize } = model.GetSettings();

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
router.get("/Items/:id", (request, response) =>
{
    sequelize
        .authenticate()
        .then(() => {
            console.log("connection has been established successfully.");

            Item.findAll({ where: { Id : request.params.id }}).then(users => { response.json({success : true, data : users }) });
        })
        .catch(err => {
            console.error("Unable to connect to the database.", err);
        });
});

// curl --data "name=Pencil"  http://localhost:3001/api/items
router.post("/Items", (request, response) => {
    sequelize
        .authenticate()
        .then(() => {
            console.log("connection has been established successfully.");

            Item.create({ Name : request.body.name }).then(users => { response.json({success : true, data : users }) });
        })
        .catch(err => {
            console.error("Unable to connect to the database.", err);
        });
});
