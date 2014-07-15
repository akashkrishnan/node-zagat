var request = require('request').defaults({ jar: true });
var querystring = require('querystring');

var locationsUrl = 'http://www.zagat.com/locations';
var locationRegex = /<li><a href="\/set-city\/(.*)">(.*)<\/a><\/li>/g;

var setLocationUrl = 'http://www.zagat.com/set-city';

var searchUrl = 'http://www.zagat.com/search/place';
var searchRegex = /title\s*:\s*'(.*)'/g;


module.exports = {
  getLocations: getLocations,
  setLocation: setLocation,
  searchPlaces: searchPlaces
};

/**
 * Gets a list of locations supported by Zagat.
 *
 * @param done {Function(err, locations)} Required.
 *  @param err {String} error message
 *  @param locations {{ name: code }} list of locations
 */
function getLocations(done) {
  request(locationsUrl, function (error, response, body) {
    if (error) done(error);
    else if (response.statusCode != 200) done('Unexpected status code: ' + response.statusCode + '.');
    else {
      var locations = {};
      var match;
      while (match = locationRegex.exec(body)) locations[match[2]] = match[1];
      done(null, locations);
    }
  });
}

/**
 * Sets the location for future Zagat searches using the given 'location'
 *
 * @param location {String} Required.
 * @param done {Function(err)} Required.
 *  @param err {String} error message
 */
function setLocation(location, done) {
  request(setLocationUrl + '/' + location, function (error, response, body) {
    if (error) done(error);
    else if (response.statusCode != 200) done('Unexpected status code: ' + response.statusCode + '.');
    else done();
  });
}

/**
 * Searches Zagat for a list of restaurants with the given 'query'
 *
 * @param string {String} Required.
 * @param done {Function(err, restaurants)} Required.
 *  @param err {String} error message
 *  @param restaurants {Object} list of restaurants
 */
function searchPlaces(string, done) {
  var query = querystring.stringify({ text: string });
  request(searchUrl + '/?' + query, function (error, response, body) {
    if (error) done(error);
    else if (response.statusCode != 200) done('Unexpected status code: ' + response.statusCode + '.');
    else {
      var restaurants = [];
      var match;
      while (match = searchRegex.exec(body)) {
        restaurants.push({ title: match[1] });
      }
      done(null, restaurants);
    }
  });
}
