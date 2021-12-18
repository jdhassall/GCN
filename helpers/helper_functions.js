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

module.exports = {
  filterResults,
  extractReleventData,
}