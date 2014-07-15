var zagat = require('./index.js');

// Get a list of all locations
zagat.getLocations(function (err, locations) {
  if (err) throw err;
  else {

    console.log('LOCATIONS:\n', locations);

    // Set current location to Boston
    zagat.setLocation(locations.Boston, function (err) {
      if (err) throw err;
      else {

        // Search 'palace'
        zagat.searchPlaces('palace', function (err, restaurants) {
          if (err) throw err;
          else {

            console.log('\nRESTAURANTS:\n', restaurants);

            // Get information on first restaurant in list
            var restaurant = restaurants[0];
            zagat.getPlace(restaurant.url, function (err, info) {
              if (err) throw err;
              else {

                console.log('\nRESTAURANT INFO:\n', info);

              }
            });

          }
        });

      }
    });

  }
});
