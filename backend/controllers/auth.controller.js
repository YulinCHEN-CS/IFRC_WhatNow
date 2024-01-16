const User = require("../models/user.model");
const { config } = require("../config");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function upperTransform(value) {
    if (value) {
        return value.toUpperCase();
    }
    return value;
}

exports.signup = (req, res) => {
    try {
        var role = upperTransform(req.body.role);
        var ns_1 = upperTransform(req.body.ns_1);
        var ns_2 = upperTransform(req.body.ns_2);
        var ns_3 = upperTransform(req.body.ns_3);

        console.log("role: " + role);

        User.insert({
            email: req.body.email || "NULL",
            name: req.body.name || "NULL",
            firstname: req.body.firstname || "NULL",
            lastname: req.body.lastname || "NULL",
            password: bcrypt.hashSync(req.body.password, 8) || "NULL",
            role: role || "user",
            ns_1: ns_1 || "NULL",
            ns_2: ns_2 || "NULL",
            ns_3: ns_3 || "NULL"
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
        return;
    }
    res.status(200).send({ message: "User was registered successfully!" });
};

exports.signin = (req, res) => {
    console.log(req.body.email)
    User.findByEmail(req.body.email, (err, result) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!result.length) {
            return res.status(404).send({ message: "User Not found." });
        }
        let user = result[0];
        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        let token = jwt.sign({ email: user.email }, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        req.session.user = user;
        req.session.token = token;
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
}

exports.signout = (req, res) => {
    req.session = null;
    res.status(200).send({ message: "User was logged out successfully!" });
};