const common = require("./Common");
const models = require("./Models");

const {Router} = common.GetSettings();
const {Item, SequelizeCommandExecute} = models.GetSettings();

// curl http://localhost:3001/api/items
Router.get("/Items", (request, response) => SequelizeCommandExecute(() => Item.findAll().then(users => response.json({
    success: true,
    data: users
}))));

// curl http://localhost:3001/api/items/1
Router.get("/Items/:Id", (request, response) => SequelizeCommandExecute(() => Item.findAll({where: {Id: request.params.Id}}).then(users => response.json({
    success: true,
    data: users
}))));

// curl --data "name=Pencil"  http://localhost:3001/api/items
Router.post("/Items", (request, response) => SequelizeCommandExecute(() => Item.create({Name: request.body.Name}).then(users => response.json({
    success: true,
    data: users
}))));

// curl -X "DELETE" http://localhost:3001/api/items/1
Router.delete("/Items/:Id", (request, response) => SequelizeCommandExecute(() => Item.destroy({where: {Id: request.params.Id}}).then(users => response.json({
    success: true,
    data: users
}))));
