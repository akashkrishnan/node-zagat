var zagat = require('./index.js');

// Get a list of all locations
zagat.getLocations(function (err, locations) {
  if (err) throw err;
  else {

    console.dir(locations);

    // Set current location to Boston
    zagat.setLocation(locations.Boston, function (err) {
      if (err) throw err;
      else {

        // Search 'garden'
        zagat.searchPlaces('', function (err, restaurants) {
          if (err) throw err;
          else {

            console.dir(restaurants);

          }
        });

      }
    });

  }
});
