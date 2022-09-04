const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const db = require("./models");

// ---- RUTEO DE APIS ----
const administradoresRouter = require("./routes/Administradores");
app.use("/admin", administradoresRouter);
const encargadosRouter = require("./routes/Encargados");
app.use("/encargados", encargadosRouter);
const divisionesRouter = require("./routes/Divisiones");
app.use("/divisiones", divisionesRouter);


// ---- PUERTO DEL SERVIDOR ----
db.sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT || 3001, () => {
            console.log("server activo puerto 3001");
        });
    })
    .catch((err) => {
        console.log(err);
    });