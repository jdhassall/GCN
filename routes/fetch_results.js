const router = require('express').Router();

router.get('/', fetchResults);

async function fetchResults(req, res) {
  try {
    // perform db query
    // check result of db query
    // return results
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'Failed', informationUpdatedSuccessfully: false });
  }
}