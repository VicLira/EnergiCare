const express = require("express");

const app = express();
const { getUsuarios } = require("./connection/connection");

app.get('/', (req, res) => {
    return res.render("index");
})

app.get("/users", async(req, res) => {
    const results = await getUsuarios();
  
    return res.json(results);
});

app.listen(3333)