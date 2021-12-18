const mysql = require('mysql');
require('dotenv').config();

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

function formatDate(dateToBeFormatted) {
  var date = new Date(dateToBeFormatted) // formated_Date - SDK returned date
  var day = ("0" + date.getDate()).slice(-2);
  date = `${date.getFullYear()}:${("0" + (date.getMonth() + 1)).slice(-2)}:${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return date
}

module.exports = {
  storeVideoData,
};