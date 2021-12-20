const fs = require('fs');

function filterResults(results) {
  var filteredResults = []
  const conditions = ["pro", "matt stephens", "5", "Mitchelton-Scott", "Dubai stage"];
  for (var i in results) {
    var title = results[i].title
    if (conditions.some(element => title.includes(element))) {
      filteredResults.push(results[i]);
    }
  };
  return filteredResults;
};

function extractReleventData(dataGcn, dataGlobalmtb) {

  var retrievedDataArr = [];
  var nextPageTokenGcn = data.nextPageToken;
  var nextPageTokenGlobalmtb = data.nextPageToken;
  var informationArr = (dataGcn.items).concat(dataGlobalmtb.items);
  
  for (var key in informationArr) {
    if (informationArr.hasOwnProperty(key)) {
      retrievedDataArr.push({
      title: informationArr[key].snippet.title,
      date: informationArr[key].snippet.publishedAt,
      });
    };
  };
  return { nextPageTokenGcn, nextPageTokenGlobalmtb, retrievedDataArr };
}


function formatDate(dateToBeFormatted) {
  try{
    var date = new Date(dateToBeFormatted) // formated_Date - SDK returned date
    var day = ("0" + date.getDate()).slice(-2);
    date = `${date.getFullYear()}:${("0" + (date.getMonth() + 1)).slice(-2)}:${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return date;
  } catch (err) {
    console.log(err)
    return false; // MAKE SURE TO USE THESE
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
  filterResults,
  extractReleventData,
  readFilterCriteriaIn,
}