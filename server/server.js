const express = require("express");
const app = express();

const userRoutes = require("./routes/user");

app.use("/", userRoutes);

app.get('/', (req, res) => {
    return res.render("index");
})

// app.get("/users", async(req, res) => {
//     const results = await user_function.getUsuarios();
  
//     return res.json(results);
// });

// app.get("/users/:userID", async (req, res) => {
//     const userID = req.params.userID;
//     const results = await user_function.getUsuarioPorID(userID);
  
//     return res.json(results);
// });

// app.get("/users/:userID/consumo/:eletrodomesticoID", async (req, res) => {
//     const userID = req.params.userID;
//     const eletrodomesticoID = req.params.eletrodomesticoID;
//     const results = await user_function.getConsumoEletrodomesticoPorUsuarioEID(userID, eletrodomesticoID);

//     return res.json(results);
// });

app.get("/users/:userID/custo-mensal", async (req, res) => {
    const userID = req.params.userID;
    const results = await user_function.calcularCustoMensalEnergiaPorUsuario(userID);

    return res.json(results);
});

app.get("/users/:userID/dicas-economia-energia", async (req, res) => {
    const userID = req.params.userID;
    const results = await user_function.getDicasEconomiaEnergiaPorUsuario(userID);

    return res.json(results);
});




app.listen(3333)