    const rl = readline.createInterface({
      input: fs.createReadStream('./youtube(35).sql'),
      terminal: false
    });
    rl.on('line', function(chunk) {
      chunk = chunk.toString()
      .replace(/^\s*--[^.].*/gm, " ") // remove all comments in file
      .replace(/\s+/g, ' ') // remove excess white space
      .split(';') // split into all statements
      .map(Function.prototype.call, String.prototype.trim)
      .filter(function(el) {return el.length != 0});
      console.log('>>>>>>>>> ' + chunk)
      connection.query(chunk.toString('ascii'), function(err) {
        if (err == 'Query was empty') { 
          console.log('Empty line in file...');
          next();
        }
      })
    });     
    rl.on('close', function(){
      console.log("Database Initialized");
      connection.end();
    });



    {
      config: {
        url: 'https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyCoYLPef8dWTb9fwcyckZIeesERvg1Vj0Y&part=snippet&q=GlobalCyclingNetwork',
        method: 'GET',
        userAgentDirectives: [ [Object] ],
        paramsSerializer: [Function (anonymous)],
        headers: {
          'x-goog-api-client': 'gdcl/5.0.5 gl-node/14.15.1 auth/7.11.0',
          'Accept-Encoding': 'gzip',
          'User-Agent': 'google-api-nodejs-client/5.0.5 (gzip)',
          Accept: 'application/json'
        },
        params: {
          key: 'AIzaSyCoYLPef8dWTb9fwcyckZIeesERvg1Vj0Y',
          part: 'snippet',
          q: 'GlobalCyclingNetwork'
        },
        validateStatus: [Function (anonymous)],
        retry: true,
        responseType: 'json'
      },
      data: {
        kind: 'youtube#searchListResponse',
        etag: 'QGrvyxaQnHnAYKeLIW8QOdjFrf4',
        nextPageToken: 'CAUQAA',
        regionCode: 'GB',
        pageInfo: { totalResults: 54948, resultsPerPage: 5 },
        items: [ [Object], [Object], [Object], [Object], [Object] ]
      },
      headers: {
        'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"',
        'cache-control': 'private',
        connection: 'close',
        'content-encoding': 'gzip',
        'content-type': 'application/json; charset=UTF-8',
        date: 'Sat, 18 Dec 2021 01:31:57 GMT',
        server: 'scaffolding on HTTPServer2',
        'transfer-encoding': 'chunked',
        vary: 'Origin, X-Origin, Referer',
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'SAMEORIGIN',
        'x-xss-protection': '0'
      },
      status: 200,
      statusText: 'OK',
      request: {
        responseURL: 'https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyCoYLPef8dWTb9fwcyckZIeesERvg1Vj0Y&part=snippet&q=GlobalCyclingNetwork'
      }
    }