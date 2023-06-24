const jwt = require('jsonwebtoken');
const config = require('config');

exports.getToken = (user)=>{
    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    return token;
}