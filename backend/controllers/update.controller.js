const User = require("../models/user.model");

const bcrypt = require("bcryptjs");


exports.update = (req, res) => {
    try {
        const user = User.update(req.body.email, {
            name: req.body.name || "Anonymous",
            firstname: req.body.firstname || "Anonymous",
            lastname: req.body.lastname || "Anonymous",
            password: req.body.password || "Anonymous",
            role: req.body.role || "Anonymous",
            ns_1: req.body.ns_1 || "Anonymous",
            ns_2: req.body.ns_2 || "Anonymous",
            ns_3: req.body.ns_3 || "Anonymous"
        });
    } catch (err) {
        res.status(500).send({ message: err });
        return;
    }
    res.status(200).send({ message: "User info was updated successfully!" });
};

exports.getByEmail = (req, res) => {
    try {
        User.findByEmail(req.body.email, (err, result) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!result.length) {
                return res.status(404).send({ message: "User Not found." });
            }
            let user = result[0];
            res.status(200).send({
                name: user.name,
                email: user.email,
                roles: user.roles,
                firstname: user.firstname,
                lastname: user.lastname,
                password: user.password,
                role: user.role,
                ns_1: user.ns_1,
                ns_2: user.ns_2,
                ns_3: user.ns_3,
            });
        });
    } catch (err) {
        res.status(500).send({ message: err });
        return;
    }
}