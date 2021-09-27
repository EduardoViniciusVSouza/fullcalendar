const Sequelize = require('sequelize')


const database_url = process.env.DATABASE_URL

// dados para conexão com o banco
const sequelize = new Sequelize(database_url, {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

// tenta realizar conexão com banco de dados
sequelize.authenticate().then(() => {
    console.log("Conectado ao banco com sucesso!")
}).catch((err) => {
    console.log("Falha ao conectar com o banco, erro: " + err)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}