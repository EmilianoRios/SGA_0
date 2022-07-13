const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
    const { first_name, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            first_name: first_name,
            password: hash
        });
        res.json("Creado correctamente.");
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({
        where: { username: username },
    });

    if (!user) res.json({ error: "El usuario ingresado no existe" });

    bcrypt.compare(password, user.password).then(async (match) => {
        if (!match) res.json({ error: "Contraseña incorrecta" });

        const accessToken = sign(
            { username: user.first_name, id: user.idusuario },
            "importantsecret"
        );
        res.json({
            token: accessToken,
            username: username,
            id: user.idusuario,
        });
    });
});
