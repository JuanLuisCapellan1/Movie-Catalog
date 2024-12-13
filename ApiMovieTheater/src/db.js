const sql = require('mssql')
const config = require('./config')

const sqlConfig = {
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
  server: config.SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    trustServerCertificate: true
  }
}

async function connectDb() {
  try {
    await sql.connect(sqlConfig)
    console.log('Connected Successfully to Database!')
  } catch (err) {
    console.log('Error to connect Database', err)
  } finally {
    sql.close();
  }
}

module.exports = { connectDb, sqlConfig };
