const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const userModel = require("../model/user.model.old");
const User = require("../model/User.model")
exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            try {
                User.create({
                    name: req.body.name,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: hash
                }).then(() => {
                        res.status(201).json({message: "Utilisateur créé"})
                    }
                )
            } catch (error) {
                res.status(500).json(error);
            }

        })
        .catch(error => {
            res.status(500).json(error);
        });

}

exports.login = (req, res, next) => {
    try {
        User.findOne({email: req.body.email}).then(user => {
            bcrypt.compare(req.body.password, user.password)
                .then(success => {
                    if (success) {
                        res.status(200).json({
                            email: user.email,
                            jwt: jwt.sign(
                                {email: user.email},
                                process.env.JWT_SECRET,
                            ),
                        });
                    } else {
                        res.status(401).json({message: "Mot de passe incorrect"});
                    }
                })
                .catch(error => {
                    res.status(500).json(error);
                })
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}