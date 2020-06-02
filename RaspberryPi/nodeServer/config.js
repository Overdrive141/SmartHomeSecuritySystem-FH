var admin = require("firebase-admin");
var serviceAccount = require("./smart-home-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smarthomefyp-f9244.firebaseio.com"
});

module.exports.admin = admin;
