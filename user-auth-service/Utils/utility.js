const jwt = require('jsonwebtoken');

exports.getToken = (user)=>{
    const token = jwt.sign({ _id: user._id }, 'secretKey');
    return token;
}