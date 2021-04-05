const jwt = require('jsonwebtoken');

function issueJWT(user) {
    const _id =  user._id;
    const expiresIn = '1h';
    const jwtToken = jwt.sign({email: user.email, _id}, 'secretOrPrivateKey', {expiresIn});
    return {
        token: jwtToken,
        expiresIn
    }
}

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, 'secretOrPrivateKey');
        next();
    } 
    catch (err) {
        return res.status(401).json({success: false, message: 'invalid token'});
    }
}

module.exports.issueJWT = issueJWT;