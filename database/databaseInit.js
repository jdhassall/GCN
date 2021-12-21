const mysql = require('mysql');
const fs = require('fs');

function parseSqlFile() {
  try {
    const fileName = './youtube(35).sql';
    const sqlData = fs.readFileSync(fileName).toString()
      .replace(/^\s*--[^.].*/gm, ' ') // remove all comments in file
      .replace(/\s+/g, ' ') // remove excess white space
      .split(';') // split into all statements
      .map(Function.prototype.call, String.prototype.trim)
      .filter(function(el) {return el.length != 0});
    return sqlData;
  } catch (err) {
    console.log(err);
  }
}

// Use ENV file for all of the information that you will list below
function initDatabase() {
  try {
    const connection = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASS,
    });
    const sqlData = parseSqlFile();
    const arrLength = sqlData.length
    for (var i = 0; i < arrLength; i++) {
      connection.query(sqlData[i], function(err) {
      if (err) {
        throw err;
        };
      });
    };
    connection.end();
    console.log('Database Initialized');
  } catch (err) {
    console.log('Could not initialise database... ' + err);
  };
};

module.exports = {
  initDatabase,
};
