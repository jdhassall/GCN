const router = require('express').Router();
const { connectToDatabase, closeDatabaseConnection } = require('../database/database_operations')
router.delete('/', deleteDataById);

async function deleteDataById(req, res) {
  try {
  // perform db query
  const con = connectToDatabase();
  var sqlQuery = `DELETE FROM videos WHERE id=${req.body.id}`;
  await con.query(sqlQuery, function (err, result) {
    if (err) throw err;
    // check results returned
    if (result.affectedRows == 1) {
      return res.status(200).json({ status: 'Success', deleted: true });
    } else {
      return res.status(200).json({ status: 'Failed', deleted: false });
    };
  });
  closeDatabaseConnection(con);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'Failed', deleted: false });
  };
};

module.exports = {
    router,
    // Make sure to remove if dont get time to unit test
    deleteDataById,
}