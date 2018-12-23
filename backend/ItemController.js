
const common = require("./Common");
const { router, repository } = common.GetSettings();

// curl http://localhost:3001/api/items
router.get("/Items", (request, response) => repository.executeQuery(response, `select * from item`));

// curl http://localhost:3001/api/items/1
router.get("/Items/:id", (request, response) => repository.executeQuery(response, `select * from item where id = ${request.params.id}`));

// curl --data "name=Pencil"  http://localhost:3001/api/items
router.post("/Items", (request, response) => repository.executeQuery(response, `insert into item ([name]) values (\'${request.body.name}\')`));
