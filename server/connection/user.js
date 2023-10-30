const { query } = require("./connection");

async function getUsuarios(req, res) {
    try {
        res = await query("SELECT * FROM usuario");
        return res;
    } catch (err) {
        throw err;
    }
};

async function getUsuarioPorID(userID) {
    try {
        const res = await query("SELECT * FROM usuario WHERE user_id = ?;", [userID]);
        return res;
    } catch (err) {
        throw err;
    }
}

async function getConsumoEletrodomesticoPorUsuarioEID(userID, eletrodomesticoID) {
    try {
        const res = await query("SELECT * FROM consumo_eletrodomestico WHERE user_id = ? AND eletrodomestico_id = ?;", [userID, eletrodomesticoID]);
        return res;
    } catch (err) {
        throw err;
    }
}

async function calcularCustoMensalEnergiaPorUsuario(userID, qtdMes) {
    const sql_query = `
    SELECT
    u.user_id,
    u.nome,
    SUM(e.consumo_em_watts * c.horas_de_uso_diario * t.preco_por_kwh * ?) AS custo_mensal
FROM usuario u
JOIN consumo_eletrodomestico c ON u.user_id = c.user_id
JOIN eletrodomestico e ON c.eletrodomestico_id = e.eletrodomestico_id
JOIN tarifa_energia t ON u.compania_energia_id = t.companhia_id
WHERE u.user_id = ?
GROUP BY u.user_id, u.nome;

    `;
    try {
        const res = await query(sql_query, [qtdMes, userID]);
        return res;
    } catch (err) {
        throw err;
    }
}

async function getDicasEconomiaEnergiaPorUsuario(userID) {
    const sql_query = `
    SELECT d.dica_id, d.descricao
    FROM dica_economia_energia d
    JOIN dica_usuario du ON d.dica_id = du.dica_id
    WHERE du.user_id = ?;
    `;
    try {
        const res = await query(sql_query, [userID]);
        return res;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getUsuarios,
    getUsuarioPorID,
    getConsumoEletrodomesticoPorUsuarioEID,
    calcularCustoMensalEnergiaPorUsuario,
    getDicasEconomiaEnergiaPorUsuario
  };


