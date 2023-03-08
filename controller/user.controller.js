const userModel = require("../model/user.model");

exports.getAll = (req, res, next) => {
    try {
        res.status(200).json(userModel.getAll());
    } catch (error) {
        res.status(500).json(error);
    }
}