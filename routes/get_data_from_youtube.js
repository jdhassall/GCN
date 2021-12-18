const router = require('express').Router();
const { google } = require('googleapis');
const { storeVideoData } = require('../helpers/database_operations');
const fetch = require("node-fetch");
const { filterResults, extractRelevantData } = require('../helpers/helper_functions');
require('dotenv').config();

router.get('/', retrieveYoutubeData);

// refactor to seperate out functionality
async function retrieveYoutubeData(req, res) {
  try {
    // Make sure to abstract this out
    // google api
    let url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&part=snippet&q=GlobalCyclingNetwork`;
    var response = await fetch(url);
    console.log(response)
    var data = await response.json();

    var extractedData = extractRelevantData(data);
    var nextPageToken = extractedData[0];
    informationArr = data.items;
    // console.log(informationArr)

    // for (var key in informationArr) {
    //   if (informationArr.hasOwnProperty(key)) {
    //     retrievedDataArr.push({
    //       title: informationArr[key].snippet.title,
    //       date: informationArr[key].snippet.publishedAt,
    //     });
    //   };
    // };

    while (nextPageToken) {
      console.log(nextPageToken)
      url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&part=snippet&nextPageToken=${nextPageToken}&q=GlobalCyclingNetwork`;
      response = await fetch(url);
      data = await response.json();
      var extractedData = extractRelevantData(data);
      var nextPageToken = extractedData[0];
      var retrievedDataArr = extractedData[1];
      // nextPageToken = data.nextPageToken;
      // informationArr = data.items;
      // for (var key in informationArr) {
      //   if (informationArr.hasOwnProperty(key)) {
      //     retrievedDataArr.push({
      //       title: informationArr[key].snippet.title,
      //       date: informationArr[key].snippet.publishedAt,
      //     });
      //   };
      // };
    };

    console.log(retrievedDataArr);


    // Need to change this to use retrieved data
    const filteredResults = filterResults(sampleResults);
    for (var i in filteredResults) {
      retrievedDataArr.push({
        title: filteredResults[i].title,
        date: filteredResults[i].publishedAt,
      });    
    };
    const result = storeVideoData(retrievedDataArr);
    console.log(result)
    return res.status(200).json({ status: 'Success', informationUpdatedSuccessfully: true });

  } catch (err) {
    res.status(500).json({ err });
    console.log(err);
  };
};

module.exports = {
    router,
    retrieveYoutubeData,
}