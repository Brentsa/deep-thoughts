const jwt = require('jsonwebtoken');

const secret = "SpaceFruitFunForever"
const expiration = "2h";

function signToken(user){

    const payload = { username: user.username, email: user.email, _id: user.id };

    return jwt.sign({data: payload}, secret, {expiresIn: expiration});
}

function authMiddleware({req}){
    
    //Allows the token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization

    //seperate "Bearer" from "<tokenvalue>"
    if(req.headers.authorization){
        token = token.split(' ').pop().trim();
    }

    //if there is no token then return the request as is
    if(!token){
        return req;
    }

    try{
        //decode and attach user data to request object;
        const {data} = jwt.verify(token, secret, {maxAge: expiration});
        req.user = data;
    }
    catch{
        console.log('Invalid token.');
    }

    //return updated token object
    return req;
}

module.exports = {signToken, authMiddleware};