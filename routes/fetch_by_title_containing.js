const router = require('express').Router();
const { connectToDatabase, closeDatabaseConnection } = require('../database/database_operations')
router.get('/', fetchByFilterCriteria);

async function fetchByFilterCriteria(req, res) {
  try {
    // perform db query
    const searchTerm = req.body.searchTerm.toLowerCase();
    
    const con = connectToDatabase();
    var sqlQuery = `SELECT id, title FROM videos WHERE (title LIKE '%${searchTerm}%')`;
    await con.query(sqlQuery, function (err, rows) {
      if (err) throw err;
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
