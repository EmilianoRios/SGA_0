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

// ---- Update Divisiones -----

router.put("/barrio/actualizar/porid/:id", async (req, res) => {
    const id = req.params.id;
    const barrio = req.body;
    const coordinador = await Barrios.update(barrio, { where: { id: id } });
    res.json(coordinador);
});

router.put("/circuito/actualizar/porid/:id", async (req, res) => {
    const id = req.params.id;
    const circuito = req.body.circuito;
    const subcoordinador = await Circuitos.update({ circuito: circuito }, { where: { id: id } });
    res.json(subcoordinador);
});

router.put("/localidad/actualizar/porid/:id", async (req, res) => {
    const id = req.params.id;
    const localidad = req.body.localidad;
    const delegado = await Localidades.update({ localidad: localidad }, { where: { id: id } });
    res.json(delegado);
});

// ---- Eliminacion de Divisiones -------

router.delete("/barrio/baja/porid/:id", async (req, res) => {
    const id = req.params.id;
    await Barrios.destroy({ where: { id: id } });
})

router.delete("/circuito/baja/porid/:id", async (req, res) => {
    const id = req.params.id;
    await Circuitos.destroy({ where: { id: id } });
})

router.delete("/localidad/baja/porid/:id", async (req, res) => {
    const id = req.params.id;
    await Localidades.destroy({ where: { id: id } });
})

module.exports = router;