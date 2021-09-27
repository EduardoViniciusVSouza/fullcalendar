require('dotenv-safe').config()

const express = require('express')
const app = express();
const PORT = 8000

const routerRegister = require('./server/routes/RouteRegister').routerRegister
const routerLogin = require('./server/routes/RouteLogin').routerLogin
const routerAuthorization = require('./server/routes/RouteAuthorization').routerAuthorization


app.use(express.static(`${__dirname}/dist/asnyer-site`));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//routers
app.use('/api/register', routerRegister)
app.use('/api/auth', routerLogin)
app.use('/api/authorization', routerAuthorization)

app.listen(PORT, () => {
    console.log("Servidor Rodando na porta " + PORT)
})