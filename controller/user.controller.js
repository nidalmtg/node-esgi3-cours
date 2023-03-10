const User = require('../model/User.model');

exports.getAll = (req, res, next) => {
    try {
        User.find()
        .then(users => {
                res.status(200).json(users);
            })
            .catch(e => {
                console.error(e);
            });
    } catch (error) {
        res.status(500).json(error);
    }
}