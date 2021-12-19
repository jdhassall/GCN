const router = require('express').Router();
const { connectToDatabase, closeDatabaseConnection } = require('../database/database_operations')
router.get('/', fetchByFilterCriteria);

async function fetchByFilterCriteria(req, res) {
  try {
    // perform db query
    const con = connectToDatabase();
    var sqlQuery = `SELECT * FROM videos WHERE (title LIKE '%pro%' or title LIKE '%matt stephens%' or title LIKE '%5%' or title LIKE '%Mitchelton-Scott%' or title LIKE '%Dubai stage%' )`;
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
}
