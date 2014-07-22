var request = require('request').defaults({ jar: true });
var querystring = require('querystring');

var locationsUrl = 'http://www.zagat.com/locations';
var locationRegex = /<li><a href="\/set-city\/(.*)">(.*)<\/a><\/li>/g;

var setLocationUrl = 'http://www.zagat.com/set-city';

var searchUrl = 'http://www.zagat.com/search/place';
var searchRegex = /\s*([a-zA-Z]*)\s+:\s(.*)/g;


module.exports = {
  getLocations: getLocations,
  setLocation: setLocation,
  searchPlaces: searchPlaces,
  getPlace: getPlace
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
    else if (response.statusCode != 200) done(new Error('Unexpected status code: ' + response.statusCode + '.'));
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
    else if (response.statusCode != 200) done(new Error('Unexpected status code: ' + response.statusCode + '.'));
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
    else if (response.statusCode != 200) done(new Error('Unexpected status code: ' + response.statusCode + '.'));
    else {

      var restaurants = [];

      // Search for all key-value pairs
      for (var i = 0, match; match = searchRegex.exec(body);) {
        if (match[1]) {

          // Figure out if we need to add a new restaurant based on existing keys
          if (restaurants[i] && restaurants[i][match[1]]) i++;
          if (!restaurants[i]) restaurants[i] = {};

          // Remove trailing comma; replace single with double quotes
          var v = match[2].replace(/,(\s*)$/, '$1').replace(/'/g, '"');

          restaurants[i][match[1]] = JSON.parse(v);

        }
      }

      done(null, restaurants);

    }
  });
}

/**
 * Gets information about a place from 'restaurantUrl' on Zagat
 *
 * @param restaurantUrl {String} Required.
 * @param done {Function(err, info)} Required.
 *  @param err {String} error message
 *  @param info {{ key: value }} restaurant information
 */
function getPlace(restaurantUrl, done) {
  request(restaurantUrl, function (error, response, body) {
    if (error) done(error);
    else if (response.statusCode != 200) done(new Error('Unexpected status code: ' + response.statusCode + '.'));
    else {

      return done('node-zagat.getPlace not implemented.');

      var info = {};
      // TODO: impl
      done(null, info);

    }
  });
}
