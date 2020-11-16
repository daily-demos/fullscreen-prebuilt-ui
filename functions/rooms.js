// server.js
// where your node app starts
// we've started you off with Express (https://expressjs.com/) and axios (https://github.com/axios/axios)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const serverless = require('serverless-http');


// MAKE SURE YOU HAVE ADDED YOUR API KEY IN THE .env file or an accessible environment variable
const BASE_URL = "https://api.daily.co/v1/";
const API_AUTH = process.env.DAILY_API_KEY;

const app = express();
const router = express.Router();

router.use(compression());

const routerBasePath = process.env.NODE_ENV === 'dev' ? `/rooms` : `/.netlify/functions/rooms`;

console.log(routerBasePath)

//rooms - https://docs.daily.co/reference#list-rooms

router.post("/", async (request, response) => {
    try {
    const rooms = await apiHelper("post", "/rooms", request.body);
    response.json(rooms);
    } catch (e) {
    console.log("error: ", e);
    response.status(500).json({ error: e.message });
    }
});


// create an axios instance that includes the BASE_URL and your auth token 
// this may be useful to put in an external file to it can be referenced
// elsewhere once your application grows
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: { Authorization: `Bearer ${API_AUTH}` }
});


const apiHelper = async (method, endpoint, body = {}) => {
    try {
    const response = await api.request({
        url: endpoint,
        method: method,
        data: body
    });
    return response.data;
    } catch (error) {
    console.log("Status: ", error.response.status);
    console.log("Text: ", error.response.statusText);
    // need to throw again so error is caught
    // a possible improvement here is to pass the status code back so it can be returned to the user 
    throw new Error(error);
    }
};

app.use(routerBasePath, router);

// Apply express middlewares
router.use(cors());
router.use(bodyParser.json());

module.exports.handler = serverless(app);
module.exports = app; 




