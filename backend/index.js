const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/user");

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then((user) => {
      if (!user || user.password !== password) {
        return res.status(400).json({ error: "Identifiants incorrects" });
      }
      res.json({ message: "Connexion réussie", user });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
  console.log("server is running");
});
