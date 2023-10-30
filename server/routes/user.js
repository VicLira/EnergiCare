const express = require("express");
const router = express.Router();
const user_function = require("../connection/user.js");

router.get('/', (req, res) => {
    return res.render("index");
})

router.get("/users", async(req, res) => {
    const results = await user_function.getUsuarios();
  
    return res.json(results);
});

router.get("/users/:userID", async (req, res) => {
    const userID = req.params.userID;
    const results = await user_function.getUsuarioPorID(userID);
  
    return res.json(results);
});

router.get("/users/:userID/consumo/:eletrodomesticoID", async (req, res) => {
    const userID = req.params.userID;
    const eletrodomesticoID = req.params.eletrodomesticoID;
    const results = await user_function.getConsumoEletrodomesticoPorUsuarioEID(userID, eletrodomesticoID);

    return res.json(results);
});

router.get("/users/:userID/mes/:qtdMes", async (req, res) => {
    const userID = req.params.userID;
    const qtdMes = req.params.qtdMes;
    const results = await user_function.calcularCustoMensalEnergiaPorUsuario(userID, qtdMes);

    return res.json(results);
});

router.get("/users/:userID/dicas-economia-energia", async (req, res) => {
    const userID = req.params.userID;
    const results = await user_function.getDicasEconomiaEnergiaPorUsuario(userID);

    return res.json(results);
});

module.exports = router;