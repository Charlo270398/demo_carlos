const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const fs = require("fs");
const http = require("https");
app.use(cors()) 
dotenv.config(); //Load .env params
const jsonParser = bodyParser.json() //JSON body parser middleware
require('./database/connection')

const certificate_private_key = process.env.CERTIFICATE_KEY;
const certificate = fs.readFileSync('certs/server_certificate.crt').toString();
const server_options = {key: certificate_private_key, cert: certificate};

//JWT verification Middleware
const { CheckAuthorization } = require('./src/utils/CheckAuthorization'); 

//Use cases
const { GetNewsList } = require('./src/use_cases/new/GetNewsList');
const { ArchiveNew } = require('./src/use_cases/new/ArchiveNew');
const { AddNew } = require('./src/use_cases/new/AddNew');
const { DeleteNew } = require('./src/use_cases/new/DeleteNew');
const { Register } = require('./src/use_cases/user/Register');
const { Login } = require('./src/use_cases/user/Login');

const server = http.createServer(server_options, app).listen(5000, async function () {
    console.log(`Servidor Node.js lanzado en el puerto ${ 5000 }!`);
});

//Get list of news
app.get('/news', CheckAuthorization, async function(req,res) {
    try {
        const GetNewListResult = await GetNewsList({isArchivedNews: req.query.isArchivedNews});
        res.statusCode = GetNewListResult.codeResult;
        res.send(GetNewListResult.newsList)
    } catch (err) {
        //Bad request
        console.error(err);
        res.statusCode = 400;
        res.send(null)
    }
});

//Archive new
app.put('/news/:_id/archive', CheckAuthorization, async function(req,res) {
    try {
        const ArchiveNewResult = await ArchiveNew({_id: req.params._id});
        res.statusCode = ArchiveNewResult.codeResult;
        res.send({})
    } catch (err) {
        //Bad request
        console.error(err);
        res.statusCode = 400;
        res.send(null)
    }
});

//Add new
app.post('/news/add', CheckAuthorization, jsonParser, async function(req,res) {
    try {
        const AddNewResult = await AddNew(req.body);
        res.statusCode = AddNewResult.codeResult;
        res.send(AddNewResult.addedNew)
    } catch (err) {
        //Bad request
        console.error(err);
        res.statusCode = 400;
        res.send(null)
    }
});

//Delete new
app.delete('/news/:_id/delete', CheckAuthorization, jsonParser, async function(req,res) {
    try {
        const DeleteNewResult = await DeleteNew({_id: req.params._id});
        res.statusCode = DeleteNewResult.codeResult;
        res.send({})
    } catch (err) {
        //Bad request
        console.error(err);
        res.statusCode = 400;
        res.send(null)
    }
});

//Login
app.post('/login', jsonParser, async function(req,res) {
    try {
        const LoginResult = await Login(req.body);
        res.statusCode = LoginResult.codeResult;
        res.send({jwt: LoginResult.jwt})
    } catch (err) {
        //Bad request
        console.error(err);
        res.statusCode = 400;
        res.send(null)
    }
});

//Register
app.post('/register', jsonParser, async function(req,res) {
    try {
        const RegisterResult = await Register(req.body);
        res.statusCode = RegisterResult.codeResult;
        res.send({jwt: RegisterResult.jwt})
    } catch (err) {
        //Bad request
        console.error(err);
        res.statusCode = 400;
        res.send(null)
    }
});