const mysql = require('mysql');
const { formatDate } = require('./helper_functions');
require('dotenv').config();

// REMEMBER TO CLOSE THE DATABASE CONNECTION

function connectToDatabase() {
  try {
    var con = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASS,
      database: process.env.DATABASE,
    });
    con.connect(function(err) {
      if (err) {
        console.log(err);
        throw err; // Add in a return statement here to return false with a reason
      } else {
        console.log("Connected!");
      };
    });
    return con;
  } catch (err) {
    console.log(err);
    return false;
  };
};

function closeDatabaseConnection(con) {
  try {
    con.end(function(err) {
      if (err) {
        return console.log('error:' + err.message);
      }
      console.log('Closed database connection.');
    });
  } catch (err) {
    console.log(err);
  };
};

// May possibly want to use a JSON dictionary instead of 
function storeVideoData(resultsForStoring) {
  try {
    var con = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASS,
      database: process.env.DATABASE,
    });
    con.connect(function(err) {
      if (err) {
        console.log(err);
        throw err; // Add in a return statement here to return false with a reason
      } else {
        console.log("Connected!");
      } 
      for (var i in resultsForStoring) {
        var date = formatDate(resultsForStoring[i].date)
        var sqlQuery = `INSERT INTO videos (title, date) VALUES ("${resultsForStoring[i].title}", "${date}")`;
        con.query(sqlQuery, function (err, result) {
          if (err) throw err;
          if (result.affectedRows != 1) {
            return false
          };
        });
      };  
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  };
};

function fetchAllData() {
  const con = connectToDatabase();
  var sqlQuery = `SELECT * FROM videos`;
  const result = performDatabaseQuery(con, sqlQuery);
  closeDatabaseConnection(con);
  if (result) {
    return result;
  } else {
    return false;
  };
};

function performDatabaseQuery(con, sqlQuery) {
  try {
    con.query(sqlQuery, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
    return result;
  } catch (err) {
    console.log(err)
    return false;
  };
};

module.exports = {
  storeVideoData,
  fetchAllData,
};