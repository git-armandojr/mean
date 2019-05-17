"use strict";

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcrypt-nodejs');

let accountSchema = new Schema({
    firstName: {
        type: String,
        minlength: [2, 'O nome do usuário deve ter ao menos duas letras!'],
        required: [true, 'O nome do usuário é obrigatório!']
    },
    lastName: {
        type: String,
        minlength: [2, 'O sobrenome do usuário deve ter ao menos duas letras!'],
        required: [true, 'O nome do usuário é obrigatório!']
    },
    email: {
        type: String,
        index: { unique: true },
        sparse: true,
        match: [/^\w[\w\d._%+-]*@[\w\d.-]+\.[\w]{2,}(\.[\d\w]{2})?$/, 'O email do usuário é inválido!']
    },
    phone: {
        type: String,
        match: [/^(\(\d{2}\) ?)?\d{4,5}-?\d{4}/, 'O telefone do usuário é inválido!']
    },
    _password: {
        type: String,
        required: [true, 'A senha é obigatória']
    },
});

let _passwordEncryptor = function(next) {
    let errors = {};
    if(this._password && this._password.length < 4){
        errors._password = 'A senha do usuário deve ter ao menos quatro letras!';
        let error = new Error();
        error.name = 'PreValidatorError';
        error.errors = errors;
        next(error);
    }
    else {
        this._password = bcrypt.hashSync(this._password);
        next();
    }
};
accountSchema.pre('save', _passwordEncryptor);

module.exports = mongoose.model('account', accountSchema);
