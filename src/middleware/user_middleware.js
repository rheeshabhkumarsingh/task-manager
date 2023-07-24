const bcrypt = require('bcrypt');

async function hashPassword(req, res, next) {
    if(req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
    }
    next();
}

module.exports = {hashPassword}