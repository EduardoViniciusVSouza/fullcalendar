const db = require('../database/db')

const Profile = db.sequelize.define("Profiles", {
    profileId: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: db.Sequelize.STRING
    },
    surname: {
        type: db.Sequelize.STRING
    },
})



module.exports = {Profile: Profile}