const users = require('../models/users');

module.exports = {
    requireLogin(requireAdmin = false) {
        return (req, res, next) => {
            const header = req.headers.authorization;
            if (header) {
                const token = header.split(' ')[1];
                users.verifyTokenAsync(token)
                    .then(user => {
                        if (user && (!requireAdmin || user.role === 'admin')) {
                            req.user = user;
                            next();
                        } else {
                            next({ code: 401, message: 'Invalid token' });
                        }
                    }).catch(err=> {
                        next({ code: 401, message: err });
                    });
            }else{
                next({ code: 401, message: 'Missing token' });
            }
        }
    }
}