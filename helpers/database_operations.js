const mysql = require('mysql');
require('dotenv').config();

// May possibly want to use a JSON dictionary instead of 
function storeVideoData(retrievedDataArr) {
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
        throw err;
      } else {
        console.log("Connected!");
      } // Add in a return statement here to return false with a reason
      for (var i in retrievedDataArr) {
        var date = formatDate(retrievedDataArr[i].date)
        var sqlQuery = `INSERT INTO videos (title, date) VALUES ("${retrievedDataArr[i].title}", "${date}")`;
        con.query(sqlQuery, function (err, result) {
          if (err) throw err;
          // check result.affectedRows == 1 to tell if datbase insertion has happened
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