const axios = require("axios");
const swarmAPIVersion = "20151220";

var swarmInstance = axios.create({
  baseURL: "https://api.foursquare.com/v2",
  timeout: 5000
});

exports.swarmInstance = swarmInstance;

exports.getVenue = function(venueId) {
  var qs = `client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${process.env.FOURSQUARE_CLIENT_SECRET}&v=${swarmAPIVersion}`

  return swarmInstance.get(`/venues/${venueId}?${qs}`);
}

exports.checkin = function(venueId, latitude, longitude, accessToken) {
  var ll = `${latitude},${longitude}`
  var qs = `oauth_token=${accessToken}&v=${swarmAPIVersion}&venueId=${venueId}&ll=${ll}`
  return swarmInstance.post(`/checkins/add?${qs}`);
}
