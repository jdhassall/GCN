const router = require('express').Router();
const fetch = require('node-fetch');
const { storeVideoData } = require('../database/database_operations');
const { extractReleventData, readFilterCriteriaIn } = require('../helpers/helper_functions');
require('dotenv').config();

router.post('/', retrieveYoutubeData);

async function retrieveYoutubeData(req, res) {
  try {
    var retrievedDataArr = [];
    var filters = readFilterCriteriaIn();
    var urlGcn = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCuTaETsuCOkJ0H_GAztWt0Q&q=%22${filters[0]}%22%7C%22${filters[1]}%22%7C%22${filters[2]}%22%7C%22${filters[3]}%22%7C%22${filters[4]}%22&key=${process.env.YOUTUBE_API_KEY}`;
    var urlGlobalmtb = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC_A--fhX5gea0i4UtpD99Gg&q=%22${filters[0]}%22%7C%22${filters[1]}%22%7C%22${filters[2]}%22%7C%22${filters[3]}%22%7C%22${filters[4]}%22&key=${process.env.YOUTUBE_API_KEY}`;
    
    var { dataGcn, dataGlobalmtb } = await fetchDataFromApi(urlGcn, urlGlobalmtb);
    console.log(dataGcn)
    var { nextPageTokenGcn, nextPageTokenGlobalmtb } = extractReleventData(dataGcn, dataGlobalmtb, retrievedDataArr);
    
    // return rest of paginated results
    while ((nextPageTokenGcn && nextPageTokenGlobalmtb) || nextPageTokenGcn || nextPageTokenGlobalmtb) {
      if (nextPageTokenGcn && nextPageTokenGlobalmtb) {

        urlGcn = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCuTaETsuCOkJ0H_GAztWt0Q&pageToken=${nextPageTokenGcn}&q=%22${filters[0]}%22%7C%22${filters[1]}%22%7C%22${filters[2]}%22%7C%22${filters[3]}%22%7C%22${filters[4]}%22&key=${process.env.YOUTUBE_API_KEY}`;
        urlGlobalmtb = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC_A--fhX5gea0i4UtpD99Gg&pageToken=${nextPageTokenGlobalmtb}&q=%22${filters[0]}%22%7C%22${filters[1]}%22%7C%22${filters[2]}%22%7C%22${filters[3]}%22%7C%22${filters[4]}%22&key=${process.env.YOUTUBE_API_KEY}`;
        var { dataGcn, dataGlobalmtb } = await fetchDataFromApi(urlGcn, urlGlobalmtb);
        var { nextPageTokenGcn, nextPageTokenGlobalmtb, retrievedDataArr } = extractReleventData(dataGcn, dataGlobalmtb, retrievedDataArr);

      } else if (nextPageTokenGcn) {
        
        urlGcn = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCuTaETsuCOkJ0H_GAztWt0Q&pageToken=${nextPageTokenGcn}&q=%22${filters[0]}%22%7C%22${filters[1]}%22%7C%22${filters[2]}%22%7C%22${filters[3]}%22%7C%22${filters[4]}%22&key=${process.env.YOUTUBE_API_KEY}`;
        var { dataGcn } = await fetchDataFromApi(urlGcn, false);
        var { nextPageTokenGcn, retrievedDataArr } = extractReleventData(dataGcn, [], retrievedDataArr);

      } else if (nextPageTokenGlobalmtb) {

        urlGlobalmtb = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC_A--fhX5gea0i4UtpD99Gg&pageToken=${nextPageTokenGlobalmtb}&q=%22${filters[0]}%22%7C%22${filters[1]}%22%7C%22${filters[2]}%22%7C%22${filters[3]}%22%7C%22${filters[4]}%22&key=${process.env.YOUTUBE_API_KEY}`;
        var { dataGlobalmtb } = await fetchDataFromApi(false, urlGlobalmtb);
        var { nextPageTokenGlobalmtb, retrievedDataArr } = extractReleventData([], dataGlobalmtb, retrievedDataArr);

      };
    };

    const result = await storeVideoData(retrievedDataArr);
    if (result) {
      return res.status(200).json({ status: 'Success', informationInsertedSuccessfully: true });
    } else {
      return res.status(500).json({ status: 'Failed', informationInsertedSuccessfully: false });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'Failed', informationInsertedSuccessfully: false });
  }
}

async function fetchDataFromApi(urlGcn, urlGlobalmtb) {
  try {
    if (urlGcn) {
      var responseGcn = await fetch(urlGcn);
      var dataGcn = await responseGcn.json();
    };
    if (urlGlobalmtb) {
      var responseGlobalmtb = await fetch(urlGlobalmtb);
      var dataGlobalmtb = await responseGlobalmtb.json();
    };
    return { dataGcn, dataGlobalmtb };
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  router,
}