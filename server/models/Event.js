const db = require('../database/db')


const Event = db.sequelize.define('Events', {
    eventId: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: db.Sequelize.STRING
    },
    date: {
        type: db.Sequelize.STRING
    },
    description: {
        type: db.Sequelize.STRING
    },
    startTime: {
        type: db.Sequelize.STRING
    },
    finishTime: {
        type: db.Sequelize.STRING
    },

})



module.exports = {Event: Event}