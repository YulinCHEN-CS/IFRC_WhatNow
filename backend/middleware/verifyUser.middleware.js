const { config } = require("../config.js");
const user = require("../models/user.model.js");

const jwt = require("jsonwebtoken");

checkIfStillValid = (req, res, next) => {
    let token = req.session.token;
    console.log("token: " + token);
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            if (token != undefined) {
                res.status(401).send({ message: "Unauthorized due to Log Session Time Out!" });
                return;
            }
        }
        if (decoded == undefined) {
            console.log("first")
            next();
        } else {
            res.status(200).send({ message: "Authorized" });
            return;
        }
    });
}

const verifyUser = {
    checkIfStillValid
  };

module.exports = verifyUser;