const router = require('express').Router();
const { connectToDatabase, closeDatabaseConnection } = require('../database/database_operations')
router.get('/', fetchResults);

async function fetchResults(req, res) {
  try {
  // perform db query
  const con = connectToDatabase();
  var sqlQuery = `SELECT * FROM videos`;
  await con.query(sqlQuery, function (err, rows) {
    if (err) throw err;
    rows = JSON.stringify(rows)
    console.log('1 = ' + rows)
    rows = JSON.parse(rows)
    if (rows) {
      // return results
      return res.status(200).json({ status: 'Success', results: rows });
    } else {
      return res.status(500).json({ status: 'Failed', results: false });
    }; 
  });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'Failed', results: false });
  };
};

module.exports = {
    router,
    // Make sure to remove if dont get time to unit test
    fetchResults,
}