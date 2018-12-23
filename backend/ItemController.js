const common = require("./Common");
const models = require("./Models");

const {router} = common.GetSettings();
const {Item, SequelizeCommandExecute} = models.GetSettings();

// curl http://localhost:3001/api/items
router.get("/Items", (request, response) => SequelizeCommandExecute(() => Item.findAll().then(users => response.json({
    success: true,
    data: users
}))));

// curl http://localhost:3001/api/items/1
router.get("/Items/:Id", (request, response) => SequelizeCommandExecute(() => Item.findAll({where: {Id: request.params.Id}}).then(users => response.json({
    success: true,
    data: users
}))));

// curl --data "name=Pencil"  http://localhost:3001/api/items
router.post("/Items", (request, response) => SequelizeCommandExecute(() => Item.create({Name: request.body.Name}).then(users => response.json({
    success: true,
    data: users
}))));

// curl -X "DELETE" http://localhost:3001/api/items/1
router.delete("/Items/:Id", (request, response) => SequelizeCommandExecute(() => Item.destroy({where: {Id: request.params.Id}}).then(users => response.json({
    success: true,
    data: users
}))));
