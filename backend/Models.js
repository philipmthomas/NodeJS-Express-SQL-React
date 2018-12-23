module.exports = {
    GetSettings: function () {
        const Sequelize = require("sequelize");
        const connection = require("./settings/connection.json");
        const DISABLE_SEQUELIZE_DEFAULTS = {
            timestamps: false,
            freezeTableName: true
        };

        const sequelize = new Sequelize(
            {
                database: connection.database,
                username: connection.user,
                host: connection.host,
                password: connection.password,
                dialect: connection.dialect,
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
            });

        const Item = sequelize.define('item',
            {
                Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
                Name: {type: Sequelize.STRING},
                DateEntered: {type: Sequelize.DATE}
            }, DISABLE_SEQUELIZE_DEFAULTS);

        return {Item, sequelize};
    }
};