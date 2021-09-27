const db = require('../database/db')

const Account = db.sequelize.define('Accounts', {
    email: {
        type: db.Sequelize.STRING,
        unique: true
    },
    password: {
        type: db.Sequelize.STRING
    },
    
})



module.exports = {
    Account: Account
}












