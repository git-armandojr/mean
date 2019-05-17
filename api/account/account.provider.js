"use strict";

const Account     = require('./account.model');
const mongoHelper = require('../../mongodb/mongo-helper');

module.exports.getAll = () => {
    return Account.find()
    .select('-_password')
    .catch(mongoHelper.handleError);
}

module.exports.get = (id) => {
    return Account.findOne({ _id: id })
    .select('-_password')
    .then(mongoHelper.checkIfFound)
    .catch(mongoHelper.handleError);
}

module.exports.insert = (model) => {
    let account = new Account(model);
    return account.save()
    .catch(mongoHelper.handleError);
}

module.exports.update = (model) => {
    delete model._password;
    return Account.findOneAndUpdate({ _id: model._id }, { $set: model }, { runValidators: true })
    .catch(mongoHelper.handleError);
}

module.exports.getByEmail = (email) => {
    return Account.findOne({ email: email })
    .select('email _password')
    .then(mongoHelper.checkIfFound)
    .catch(mongoHelper.handleError);
}