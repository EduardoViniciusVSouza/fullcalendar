const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const account = require('../models/Account').Account
const profile = require('../models/Profile').Profile


// post para realizar login
router.post("/signin", async (req, res) => {
    const clientEmail = req.body.username //mudar para email no futuro, trocar no angular
    const clientPassword = req.body.password

    // busca a conta no banco de dados
    const findAccount = await account.findOne({
        where: {
            email: clientEmail,
            password: clientPassword
        }
    })

    // busca o perfil dessa conta, pela chave estrangeira
    const findProfile = await profile.findOne({
        where: {
            profileId: findAccount.profileId
        }
    })

    // payload que vai ser enviado no token
    const profileJson = {
        "profileId": findProfile.profileId,
        "name": findProfile.name
    }

    // cria a assinatura jwt, usando o segredo em variavel de ambiente
    const token = jwt.sign({ profileJson }, process.env.SECRET, { expiresIn: '120s' })
    return res.json({ auth: true, token: token })

})




module.exports = { routerLogin: router }