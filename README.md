node-zagat
==========

Node module to search for and retrieve associated information from restaurants posted on Zagat.

EXAMPLE USAGE
```
var zagat = require('node-zagat');

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

          }
        });

      }
    });

  }
});

```
