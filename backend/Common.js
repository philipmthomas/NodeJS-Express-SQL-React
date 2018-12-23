module.exports = {
    GetSettings : function() {
        const express = require("express");
        const bodyParser = require("body-parser");
        const logger = require("morgan");
        const API_PORT = 3001;
        const app = express();
        const Router = express.Router();

        app.use(bodyParser.urlencoded({extended : false }));
        app.use(bodyParser.json());
        app.use(logger("dev"));
        app.use("/api", router);
        app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

        return {API_PORT, app, Router };
    }
};