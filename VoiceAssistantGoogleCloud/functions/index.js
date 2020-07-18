const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const { dialogflow } = require("actions-on-google");
const app = dialogflow();

const setCharAt = (str, index, chr) => {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
};

const statusChecker = (status) => {
  if (status === "on") {
    return "1";
  } else if (status === "off") {
    return "0";
  }
};

const currentSensorStatus = () => {
  return admin
    .database()
    .ref("sensorstatus/command")
    .once("value")
    .then((snapshot) => {
      snapshot.val();
    });
};

app.fallback((conv, { devices, status }) => {
  switch (devices) {
    case "light":
      return admin
        .database()
        .ref(`/sensorstatus/command`)
        .once("value")
        .then((snapshot) => {
          console.log(snapshot.val());
          return admin
            .database()
            .ref("sensorstatus/")
            .update({
              command: setCharAt(snapshot.val(), 0, statusChecker(status)),
            })
            .then((snapshot) => {
              conv.ask(
                `Ok, switching ${devices} ${status}. Do you want to control anything else?`
              );
            });
        });

    // return currentSensorStatus().then(current => {
    //   return admin
    //     .database()
    //     .ref("sensorstatus/")
    //     .update({
    //       command: setCharAt(current, statusChecker(status), 0)
    //     })
    //     .then(snapshot => {
    //       conv.ask(
    //         `Ok, switching ${devices} ${status}. Do you want to control anything else?`
    //       );
    //     });
    // });
    // break;
    case "fan":
      return admin
        .database()
        .ref(`/sensorstatus/command`)
        .once("value")
        .then((snapshot) => {
          console.log(snapshot.val());
          return admin
            .database()
            .ref("sensorstatus/")
            .update({
              command: setCharAt(snapshot.val(), 1, statusChecker(status)),
            })
            .then((snapshot) => {
              conv.ask(
                `Ok, switching ${devices} ${status}. Do you want to control anything else?`
              );
            });
        });
  }
});

exports.receiveAssistantRequests = functions.https.onRequest(app);
