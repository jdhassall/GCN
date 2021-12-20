const router = require('express').Router();
const { connectToDatabase, closeDatabaseConnection } = require('../database/database_operations')
router.get('/', fetchByFilterCriteria);
const fs = require('fs');

async function fetchByFilterCriteria(req, res) {
  try {
    // Need to do this when storing results instead and put into the query to google api if possible
    fs.readFile('./search_filter (35)', 'utf8', function (err,data) {
      console.log(data);
      if (err) {
        console.log(err);
        throw err;
      }
    });
    // perform db query
    const con = connectToDatabase();
    var sqlQuery = `SELECT id, title FROM videos WHERE (title LIKE '%${req.body.searchTerm}%')`;
    await con.query(sqlQuery, function (err, rows) {
      if (err) throw err;
      console.log(rows)
      // check results
      if (rows) {
        closeDatabaseConnection(con);
        return res.status(200).json({ status: 'Success', result: rows });
      } else {
        return res.status(500).json({ status: 'Failed', result: false });
      }; 
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'Failed', result: false });
  };
};

module.exports = {
    router,
    // Make sure to remove if dont get time to unit test
    fetchByFilterCriteria,
};
