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

function extractReleventData(data) {
  var retrievedDataArr = [];
  var nextPageToken = data.nextPageToken;
  var informationArr = data.items;

  for (var key in informationArr) {
    if (informationArr.hasOwnProperty(key)) {
      retrievedDataArr.push({
      title: informationArr[key].snippet.title,
      date: informationArr[key].snippet.publishedAt,
      });
    };
  };
  return { nextPageToken, retrievedDataArr };
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

module.exports = {
  formatDate,
  filterResults,
  extractReleventData,
}