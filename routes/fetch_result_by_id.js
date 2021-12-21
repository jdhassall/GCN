const router = require('express').Router();
const { connectToDatabase, closeDatabaseConnection } = require('../database/database_operations')
router.get('/', fetchResultById);

async function fetchResultById(req, res) {
  try {
    console.log('~HIT~')
    // perform db query
    const con = connectToDatabase();
    var sqlQuery = `SELECT * FROM videos WHERE id=${req.body.id}`;
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
}