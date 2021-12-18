const router = require('express').Router();
const { google } = require('googleapis');
const { storeVideoData } = require('../helpers/database_operations');
const fetch = require("node-fetch");
const { filterResults, extractRelevantData } = require('../helpers/helper_functions');
require('dotenv').config();

router.get('/', retrieveYoutubeData);

// refactor to seperate out functionality
// Make sure to alter this to return data for the second channel
async function retrieveYoutubeData(req, res) {
  try {
    var resultsForStoring = []
    // make initial youtube api request
    const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&part=snippet&q=GlobalCyclingNetwork`;
    var response = await fetch(url);
    var data = await response.json();
    var { nextPageToken } = extractRelevantData(data);

    // return rest of paginated results
    while (nextPageToken) {
      console.log(nextPageToken)
      url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&part=snippet&nextPageToken=${nextPageToken}&q=GlobalCyclingNetwork`;
      response = await fetch(url);
      data = await response.json();
      var { nextPageToken, retrievedDataArr } = extractRelevantData(data);
    };
    // Filer results for specified terms
    const filteredResults = filterResults(retrievedDataArr);
    for (var i in filteredResults) {
      resultsForStoring.push({
        title: filteredResults[i].title,
        date: filteredResults[i].publishedAt,
      });    
    };
    // Handle result of storing data in db
    const result = storeVideoData(resultsForStoring);
    if (result) {
      return res.status(200).json({ status: 'Success', informationUpdatedSuccessfully: true });
    } else {
      return res.status(500).json({ status: 'Failed', informationUpdatedSuccessfully: false });
    }
  } catch (err) {
    res.status(500).json({ status: 'Failed', informationUpdatedSuccessfully: false });
    console.log(err);
  };
};

module.exports = {
    router,
    retrieveYoutubeData,
}