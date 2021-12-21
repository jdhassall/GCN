const fs = require('fs');

function extractReleventData(dataGcn, dataGlobalmtb, retrievedDataArr) {
  try {
    var informationArr = [];
    var nextPageTokenGcn = dataGcn.nextPageToken;
    var nextPageTokenGlobalmtb = dataGlobalmtb.nextPageToken;

    if (dataGcn == []) {
      informationArr = dataGlobalmtb.items;
    } else if (dataGlobalmtb = []) {
      informationArr = dataGcn.items 
    } else {
      informationArr = (dataGcn.items).concat(dataGlobalmtb.items);
    };

    for (var key in informationArr) {
      if (informationArr.hasOwnProperty(key)) {
        retrievedDataArr.push({
        title: informationArr[key].snippet.title,
        date: informationArr[key].snippet.publishedAt,
        });
      };
    };

    return { nextPageTokenGcn, nextPageTokenGlobalmtb, retrievedDataArr };

  } catch (err) {
    console.log(err);
    return false;
  };
};


function formatDate(dateToBeFormatted) {
  try{
    var date = new Date(dateToBeFormatted) 
    var day = ("0" + date.getDate()).slice(-2);
    date = `${date.getFullYear()}:${("0" + (date.getMonth() + 1)).slice(-2)}:${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return date;
  } catch (err) {
    console.log(err)
    return false; 
  };
};

function readFilterCriteriaIn() {
  try {
    var data = fs.readFileSync('./search_filter (35)', 'utf8')
    data = data.split('\n')
      for(var i in data) {
        data[i] = data[i].replace(' ', '%20');
      };
    return data;
  } catch (err) {
    console.log(err);
    return false;
  };
};



module.exports = {
  formatDate,
  extractReleventData,
  readFilterCriteriaIn,
}