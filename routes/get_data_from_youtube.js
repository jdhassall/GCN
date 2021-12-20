const router = require('express').Router();
const { storeVideoData } = require('../database/database_operations');
const fetch = require("node-fetch");
const { filterResults, extractReleventData } = require('../helpers/helper_functions');
require('dotenv').config();

router.post('/', retrieveYoutubeData); // GET is incorrect! Change this! More likely put or post or something

// USE YOUTUBE SEARCH LIST PARAMETER TO FILTER RESULTS
// refactor to seperate out functionality
// Make sure to alter this to return data for the second channel
async function retrieveYoutubeData(req, res) {
  try {
    // make initial youtube api request
    // Abstract this out
    var urlGcn = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCuTaETsuCOkJ0H_GAztWt0Q&q=pro%7Cmatt%20stephens%7C5%7CMitchelton-Scott%7CDubai%20stage&key=${process.env.YOUTUBE_API_KEY}`;
    var urlGlobalmtb = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC_A--fhX5gea0i4UtpD99Gg&q=pro%7Cmatt%20stephens%7C5%7CMitchelton-Scott%7CDubai%20stage&key=${process.env.YOUTUBE_API_KEY}`;
    var responseGcn = await fetch(urlGcn);
    var responseGlobalmtb = await fetch(urlGlobalmtb);
    var dataGcn = await responseGcn.json();
    var dataGlobalmtb = await responseGlobalmtb.json();
    var { nextPageTokenGcn, nextPageTokenGlobalmtb } = extractReleventData(dataGcn, dataGlobalmtb);

    // return rest of paginated results
    while (nextPageTokenGcn && nextPageTokenGlobalmtb || nextPageTokenGcn || nextPageTokenGlobalmtb) {
      if (nextPageTokenGcn && nextPageTokenGlobalmtb) {
        urlGcn = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&nextPageToken=${nextPageTokenGcn}&channelId=UCuTaETsuCOkJ0H_GAztWt0Q&q=pro%7Cmatt%20stephens%7C5%7CMitchelton-Scott%7CDubai%20stage&key=${process.env.YOUTUBE_API_KEY}`;
        urlGlobalmtb = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&nextPageToken=${nextPageTokenGlobalmtb}&channelId=UC_A--fhX5gea0i4UtpD99Gg&q=pro%7Cmatt%20stephens%7C5%7CMitchelton-Scott%7CDubai%20stage&key=${process.env.YOUTUBE_API_KEY}`;
        responseGcn = await fetch(urlGcn);
        responseGlobalmtb = await fetch(urlGlobalmtb);
        dataGcn = await responseGcn.json();
        dataGlobalmtb = await responseGlobalmtb.json();
        var { nextPageTokenGcn, nextPageTokenGlobalmtb, retrievedDataArr } = extractReleventData(dataGcn, dataGlobalmtb);
      } else if (nextPageTokenGcn) {
        urlGcn = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&nextPageToken=${nextPageTokenGcn}&channelId=UCuTaETsuCOkJ0H_GAztWt0Q&q=pro%7Cmatt%20stephens%7C5%7CMitchelton-Scott%7CDubai%20stage&key=${process.env.YOUTUBE_API_KEY}`;
        responseGcn = await fetch(urlGcn);
        dataGcn = await responseGcn.json();
        var { nextPageTokenGcn, retrievedDataArr } = extractReleventData(dataGcn, []);
      } else {
        urlGlobalmtb = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&nextPageToken=${nextPageTokenGlobalmtb}&channelId=UC_A--fhX5gea0i4UtpD99Gg&q=pro%7Cmatt%20stephens%7C5%7CMitchelton-Scott%7CDubai%20stage&key=${process.env.YOUTUBE_API_KEY}`;
        responseGcn = await fetch(urlGcn);
        responseGlobalmtb = await fetch(urlGlobalmtb);
        dataGlobalmtb = await responseGlobalmtb.json();
        var { nextPageTokenGlobalmtb, retrievedDataArr } = extractReleventData([], dataGlobalmtb);
      };
    };

    // Filer results for specified terms (THIS SHOULD NOW BE HANDLED BY QUERY)
    // const filteredResults = filterResults(retrievedDataArr);
    // for (var i in filteredResults) {
    //   resultsForStoring.push({
    //     title: filteredResults[i].title,
    //     date: filteredResults[i].publishedAt,
    //   });    
    // };

    // Handle result of storing data in db
    const result = storeVideoData(retrievedDataArr);
    if (result) {
      return res.status(200).json({ status: 'Success', informationInsertedSuccessfully: true });
    } else {
      return res.status(500).json({ status: 'Failed', informationInsertedSuccessfully: false });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'Failed', informationInsertedSuccessfully: false });
  };
};

module.exports = {
    router,
    retrieveYoutubeData,
}