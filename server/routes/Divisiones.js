const express = require("express");
const router = express.Router();
const { Barrios, Circuitos, Localidades } = require("../models");

// ---- Listado de Divisiones ----

router.get("/barrios/todos", async (req, res) => {
    const listadoBarrios = await Barrios.findAll();
    res.json(listadoBarrios);
});

router.get("/circuitos/todos", async (req, res) => {
    const listadoCircuitos = await Circuitos.findAll();
    res.json(listadoCircuitos);
});

router.get("/localidades/todos", async (req, res) => {
    const listadoLocalidades = await Localidades.findAll();
    res.json(listadoLocalidades);
});

// ---- Alta Divisiones ----

router.post("/barrio/alta", async (req, res) => {
    const barrio = req.body;
    await Barrios.create(barrio);
    res.json(barrio);
})

router.post("/circuito/alta", async (req, res) => {
    const circuito = req.body;
    await Circuitos.create(circuito);
    res.json(circuito);
})

router.post("/localidad/alta", async (req, res) => {
    const localidad = req.body;
    await Localidades.create(localidad);
    res.json(localidad);
})

// ----- Divisiones por id -----
router.get("/barrio/porid/:id", async (req, res) => {
    const id = req.params.id;
    const coordinador = await Barrios.findByPk(id);
    res.json(coordinador);
});

router.get("/circuito/porid/:id", async (req, res) => {
    const id = req.params.id;
    const subcoordinador = await Circuitos.findByPk(id);
    res.json(subcoordinador);
});

router.get("/localidad/porid/:id", async (req, res) => {
    const id = req.params.id;
    const delegado = await Localidades.findByPk(id);
    res.json(delegado);
});


module.exports = router;