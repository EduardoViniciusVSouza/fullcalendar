const express = require('express')
const router = express.Router()

const db = require('../database/db')
const account = require('../models/Account').Account
const profile = require('../models/Profile').Profile
const event = require('../models/Event').Event

// mudar para outro arquivo no futuro
account.belongsTo(profile, {foreignKey: 'profileId'})
event.belongsTo(profile, {foreignKey: 'profileId'})

db.sequelize.sync({force: true})


// post para cadastrar uma conta com dados enviados pelo client
router.post('/signup', async (req, res) => {
     //cadastra o email e senha no banco de dados
    const newacc = await account.create({ 
        email: req.body.email,
        password: req.body.password
    })
    
    // cadastra o perfil no banco de dados
    const newprof = await profile.create({ 
        name: req.body.username
    })

     // atualiza a foreignKey na account
    await account.update({profileId: newprof.profileId},
        {where: {id: newacc.id}})                     
    
})




module.exports = {routerRegister: router}