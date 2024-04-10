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

async function checkUser(code) {
    try {
        const client = new Client();
        await client.connect();
        const res = await client.query(`
            SELECT r.room_code, r.room_name
            FROM el_users u
                JOIN el_users_rooms ur ON u.email = ur.email
                JOIN el_rooms r ON ur.room_code = r.room_code
            WHERE u.code = $1
        `, [code]);
        await client.end();
        return res.rows;
    } catch (ex) {
        console.log(ex);
        return [];
    }
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    checkUser,
};
