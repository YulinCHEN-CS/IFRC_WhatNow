const { roles } = require("../config.js");
const user = require("../models/user.model.js");


checkDuplicateEmail = (req, res, next) => {
    console.log("checkDuplicateEmail")
    user.findByEmail(req.body.email, (err, result) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (result.length) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }
        next();
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.role) {
        if (!roles.includes(req.body.role.toUpperCase())) {
            res.status(400).send({
                message: "Failed! Role does not exist = " + req.body.role
            });
            return;
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateEmail,
    checkRolesExisted
  };

module.exports = verifySignUp;