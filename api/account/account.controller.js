"use strict";

const provider   = require('./account.provider');
const express    = require('express');
const route      = express.Router();

route.get('/getAll', async (req, res) => {
    try {
        let accounts = await provider.getAll();
        res.status(200).send(accounts);
    } catch(e) {
        res.status(400).send(e.message);
    }
});

route.get('/get/:id', async (req, res) => {
    try {
        let account = await provider.get(req.params.id || req.user._id);
        res.status(200).send(account);
    } catch(e) {
        res.status(400).send(e.message);
    }
});

route.post('/update', async (req, res) => {
    try {
        await provider.update(req.body);
        res.status(200).send(true);
    } catch(e) {
        res.status(400).send(e.message);
    }
});

module.exports = route;
