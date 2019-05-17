"use strict";

const jwt      = require('jsonwebtoken');
const config   = require('../config');
const provider = require('../api/account/account.provider');

module.exports.authMiddleware = async (req, res, next) => {
    let token = req.headers['x-access-token'];
    try{
        let jwtContent = jwt.verify(token, config.secret);
        let user = {
            _id : jwtContent.id,
            name: jwtContent.name,
            email: jwtContent.email
        }
        req.user = user;
        next();
    } catch(e){
        return res.status(401).send('Sessão expirada, faça login novamente!');
    }
}

module.exports.login = async (email, password) => {
    try{
        let account = await provider.getByEmail(email);
        if (account && bcrypt.compareSync(password, account._password)){
            let jwtContent = {
                _id : account._id,
                name: account.firstName + ' ' + account.lastName,
                email: account.email
            }
            return jwt.sign(jwtContent, config.secret);
        } else {
            throw new Error();
        }
    } catch(e){
        let error = new Error();
        error.message = "Email e senha não conferem!";
        throw error;
    }
}
