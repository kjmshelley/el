const { Client } = require("pg");

async function getUsers({ organization }) {
    try {
        const client = new Client();
        await client.connect();
        const res = await client.query(`SELECT * FROM el_users WHERE organization = $1`, [organization]);
        await client.end();
        return res.rows;
    } catch (ex) {
        console.log(ex);
        return [];
    }
}

async function getUser(email) {
    try {
        const client = new Client();
        await client.connect();
        const res = await client.query(`SELECT * FROM el_users WHERE email = $1`, [email]);
        await client.end();
        return res.rows;
    } catch (ex) {
        console.log(ex);
        return [];
    }
}

async function addUser({ uid, name, email, organization, img, code }) {
    try {
        const client = new Client();
        await client.connect();
        await client.query(`INSERT INTO el_users (uid, "name", email, created, organization, qrCode, code) VALUES($1, $2, $3, NOW(), $4, $5, $6)`, [uid, name, email, organization, img, code]);
        await client.end();
        return true;
    } catch (ex) {
        console.log(ex);
        return false;
    }
}

module.exports = {
    getUsers,
    getUser,
    addUser
};
