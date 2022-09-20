
const jsonwebtoken = require('jsonwebtoken');

//JWT Header check
const CheckAuthorization = (req, res, next) => {
    const tkn = req.headers.authorization;
    if (!tkn) {
      return res.sendStatus(403);
    }
    try {
        const verifyResult = jsonwebtoken.verify(tkn, process.env.JWT_SECRET);
        next();
    } catch (err) {
        console.error(err)
        return res.sendStatus(403);
    }
};

module.exports = {CheckAuthorization}