const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "whatnow-session",
    keys: ["new-whatnow-secret"],
    httpOnly: true,
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to whatnow." });
});
require('./routes/auth.routes.')(app);
require('./routes/users.routes')(app);
require('./routes/content.routes')(app);

// set port, listen for requests
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});