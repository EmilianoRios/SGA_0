const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// ---- RUTEO DE APIS ----
const usuarioRouter = require("./routes/Usuarios");
app.use("/usuarios", usuarioRouter);


// ---- PUERTO DEL SERVIDOR ----
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server activo puerto 3001");
    });
});