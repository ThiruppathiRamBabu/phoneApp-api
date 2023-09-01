const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM sys.Contacts;`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function create(items) {
    const result = await db.query(
        `INSERT INTO sys.Contacts
        (first_name, last_name, ph_number)
        VALUES
        ('${items.first_name}', '${items.last_name}', '${items.ph_number}')`
    );

    let message = 'Error in creating programming language';

    if (result.affectedRows) {
        message = 'Programming language created successfully';
      }
    
      return { message };
}

module.exports = {
    getMultiple,
    create
}