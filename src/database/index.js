var mysql = require('mysql2');
const { makeDb } = require('mysql-async-simple');

var db = makeDb();
var connection = mysql.createConnection({
  host: "localhost",
  user: "sla",
  password: "1234",
  database: "academia",
  port: 3307
});
async function connect(){
    
    await db.connect(connection);
    
    console.log("Connected!");
}

module.exports = {
    connect,
    query : (sql) => db.query(connection, sql)
};