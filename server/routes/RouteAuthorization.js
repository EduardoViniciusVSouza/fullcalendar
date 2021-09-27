const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const event = require('../models/Event').Event

// post para criar um evento 
router.post('/createEvent', verifyJWT, async (req, res) => {
    //pegando id do usuario pelo payload do token presente no headers
    const token = req.headers['x-acess-token']
    const profile = decodeToken(token)
    const profileId = profile.profileId

    // cria o evento no banco de dados após token ter sido validado com a função: verifyJWT()
    const newEvent = await event.create({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        startTime: req.body.startTime,
        finishTime: req.body.finishTime,
        profileId: profileId
    })

})

// get nos eventos relacionados ao perfil
router.get('/getEvents', verifyJWT, async (req, res) => {
    const token = req.headers['x-acess-token']
    const profile = decodeToken(token)
    const profileId = profile.profileId

    // busca todos eventos de um perfil pela chave estrangeira
    const events = await event.findAll({ where: { profileId: profileId } })

    // envia os eventos buscados para o client
    res.json(events)
})

// get para um único evento relacionado a um perfil
router.get('/getEvent/:eventId', verifyJWT, async (req, res) => {
    const token = req.headers['x-acess-token']
    const profile = decodeToken(token)
    const profileId = profile.profileId

    // busca o evento selecionado pelo eventId enviado pelo client
    const selectedEvent = await event.findOne({
        where: {
            profileId: profileId,
            eventId: req.params.eventId
        }
    })

    res.json(selectedEvent)
})

// delete de um evento pelo eventId enviado pelo client
router.delete('/deleteEvent/:eventId', verifyJWT, async (req, res) => {
    const token = req.headers['x-acess-token']
    const profile = decodeToken(token)
    const profileId = profile.profileId

    await event.destroy({
        where: {
            eventId: req.params.eventId,
            profileId: profileId
        }
    })

})

// update em um evento pelo eventId enviado pelo client
router.put('/updateEvent/:eventId', verifyJWT, async (req, res) => {
    const token = req.headers['x-acess-token']
    const profile = decodeToken(token)
    const profileId = profile.profileId

    // campos a serem editados, com os dados enviados pelo client, e onde vai ser feito o update
    await event.update({
        title: req.body.title,
        description: req.body.description,
        startTime: req.body.startTime,
        finishTime: req.body.finishTime
    },
        {
            where: {
                eventId: req.params.eventId,
                profileId: profileId
            }
        })
})

// função para decodificar e pegar o payload enviado pelo client
function decodeToken(token) {
    const decodedToken = jwt.decode(token)

    return decodedToken.profileJson
}

// função para verificar se o token enviado pelo client é autêntico
function verifyJWT(req, res, next) {
    const token = req.headers['x-acess-token'] // busca o token pelo headers

    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' }) // identifica se não existe token no headers

    // verifica se o token é autêntico, utilizando o segredo em variavel de ambiente
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ auth: false, message: 'Failed authentication token' })

        req.userId = decoded.id;
        next()
    })
}

module.exports = {
    routerAuthorization: router
}