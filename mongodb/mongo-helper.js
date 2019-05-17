"use strict";

const _genericMessage = 'Falha na operação!';

module.exports.handleError = (error) => {
    console.log(error)
    let e = new Error();
    switch(error.name){
        case 'ValidationError':
            e.message = Object.values(error.errors).filter(errorObject => errorObject.properties).map(errorObject => errorObject.properties.message).join('\n');
            break;
        case 'PreValidatorError':
            e.message = Object.values(error.errors).join('\n');
            break;
        case 'CastError':
            let CastErrorKey = error.path;
            e.message = `${CastErrorKey} inválido!`;
            break;
        case 'MongoError':
            if((error.code === 11000)){
                let index = error.message.split(' dup key')[0].split('index: ')[1];
                let MongoErrorKey = index.substring(0, index.lastIndexOf('_'));
                e.message = `${MongoErrorKey} já foi cadastrado!`;
            } else{
                e.message = _genericMessage;
            }
            break;
        case 'NotFound':
            e.message = 'Impossível encontrar os dados!';
            break;
        default:
            e.message = _genericMessage;
            break;
    }
    throw e;
}

module.exports.checkIfFound = (result) => {
    if(!result){
        let e = new Error();
        e.name = 'NotFound';
        throw e;
    }
    else
        return result;
}
