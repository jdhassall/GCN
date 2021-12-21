const router = require('express').Router();
const { connectToDatabase, closeDatabaseConnection } = require('../database/database_operations');

router.get('/', fetchByFilterCriteria);

async function fetchByFilterCriteria(req, res) {
  try {
    var searchTerm;
    var sqlQuery;
    const con = connectToDatabase();
    if (!req.body.title && !req.body.date) return res.status(400).json({ status: 'Failed', result: false });
    if (req.body.title) {
      searchTerm = req.body.title.toLowerCase();
      sqlQuery = `SELECT id, title FROM videos WHERE (title LIKE '%${searchTerm}%')`;
    } else {
      searchTerm = req.body.date;
      sqlQuery = `SELECT id, title FROM videos WHERE (date LIKE '%${searchTerm}%')`;
    };
    
    await con.query(sqlQuery, function (err, rows) {
      if (err) throw err;
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
  }
}

module.exports = {
  router,
};
