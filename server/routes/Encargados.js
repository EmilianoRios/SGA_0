const express = require("express");
const router = express.Router();
const { Coordinadores, SubCoordinadores, Delegados, Incorporados } = require("../models");

// ---- Listado de Encargados ----

router.get("/coordinadores/todos", async (req, res) => {
    const listadoCoordinadores = await Coordinadores.findAll();
    res.json(listadoCoordinadores);
});

router.get("/subcoordinadores/todos", async (req, res) => {
    const listadoSubCoordinadores = await SubCoordinadores.findAll();
    res.json(listadoSubCoordinadores);
});

router.get("/delegados/todos", async (req, res) => {
    const listadoDelegados = await Delegados.findAll();
    res.json(listadoDelegados);
});

router.get("/incorporados/todos", async (req, res) => {
    const listadoIncorporados = await Incorporados.findAll();
    res.json(listadoIncorporados);
});

// ---- Ultima id de las tablas de encargados ----

router.get("/coordinadores/ultimo", async (req, res) => {
    const ultimaIdCoordinador = await Coordinadores.findOne({order: [['id', 'DESC']],});
    res.json(ultimaIdCoordinador);
});

router.get("/subcoordinadores/ultimo", async (req, res) => {
    const ultimaIdSubCoordinador = await SubCoordinadores.findOne({order: [['id', 'DESC']],});
    res.json(ultimaIdSubCoordinador);
});

router.get("/delegados/ultimo", async (req, res) => {
    const ultimaIdDelegado = await Delegados.findOne({order: [['id', 'DESC']],});
    res.json(ultimaIdDelegado);
});

router.get("/incorporados/ultimo", async (req, res) => {
    const ultimaIdIncorporado = await Incorporados.findOne({order: [['id', 'DESC']],});
    res.json(ultimaIdIncorporado);
});

// ---- Encargados por Id ----

router.get("/coordinadores/porId/:id", async (req, res) => {
    const id = req.params.id;
    const coordinador = await Coordinadores.findByPk(id);
    res.json(coordinador);
});

router.get("/subcoordinadores/porId/:id", async (req, res) => {
    const id = req.params.id;
    const subcoordinador = await SubCoordinadores.findByPk(id);
    res.json(subcoordinador);
});

router.get("/delegados/porId/:id", async (req, res) => {
    const id = req.params.id;
    const delegado = await Delegados.findByPk(id);
    res.json(delegado);
});

router.get("/incorporados/porId/:id", async (req, res) => {
    const id = req.params.id;
    const incorporado = await Incorporados.findByPk(id);
    res.json(incorporado);
});

// ---- Filtrar por encargado especifico ----

router.get("/subcoordinadores/coordinador/:coordinadorId", async (req, res) => {
    const id = req.params.coordinadorId;
    const listadoSubCoordinadores = await SubCoordinadores.findAll({ where: { CoordinadoreId: id } });
    res.json(listadoSubCoordinadores);
});

router.get("/delegados/subcoordinador/:subcoordinadorId", async (req, res) => {
    const id = req.params.subcoordinadorId;
    const listadoDelegados = await Delegados.findAll({ where: { SubCoordinadoreId: id } });
    res.json(listadoDelegados);
});

router.get("/incorporados/delegado/:delegadoId", async (req, res) => {
    const id = req.params.delegadoId;
    const listadoIncorporados = await Incorporados.findAll({ where: { DelegadoId: id } });
    res.json(listadoIncorporados);
});

router.get("/coordinadores/subcoordinador/:subcoordinadorId", async (req, res) => {
    const id = req.params.subcoordinadorId;
    const listadoCoordinadores = await Coordinadores.findAll({ where: { SubCoordinadoreId: id } });
    res.json(listadoCoordinadores);
});

router.get("/subcoordinadores/delegado/:delegadoId", async (req, res) => {
    const id = req.params.delegadoId;
    const listadoSubCoordinadores = await SubCoordinadores.findAll({ where: { DelegadoId: id } });
    res.json(listadoSubCoordinadores);
});

router.get("/delegados/incorporado/:incorporadoId", async (req, res) => {
    const id = req.params.incorporadoId;
    const listadoDelegados = await Delegados.findAll({ where: { IncorporadoId: id } });
    res.json(listadoDelegados);
});

// ---- Alta de Encargado ----

router.post("/coordinador/alta", async (req, res) => {
    const coordinador = req.body;
    await Coordinadores.create(coordinador);
    res.json(coordinador);
})

router.post("/subcoordinador/alta", async (req, res) => {
    const subcoordinador = req.body;
    await SubCoordinadores.create(subcoordinador);
    res.json(subcoordinador);
})

router.post("/delegado/alta", async (req, res) => {
    const delegado = req.body;
    await Delegados.create(delegado);
    res.json(delegado);
})

router.post("/incorporado/alta", async (req, res) => {
    const incorporado = req.body;
    await Incorporados.create(incorporado);
    res.json(incorporado);
})

module.exports = router;