const axios = require("axios");

var swarmInstance = axios.create({
  baseURL: "https://api.foursquare.com/v2",
  timeout: 5000
});

exports.swarmInstance = swarmInstance;

exports.getVenue = function(venueId) {
  var qs = `client_id=${process.env.FOURSQUARE_CLIENT_ID},client_secret=${process.env.FOURSQUARE_CLIENT_SECRET}`

  return swarmInstance.get(`/v2/venues/${venueId}?${qs}`);
}
