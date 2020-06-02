// const functions = require("firebase-functions");

// const admin = require("firebase-admin");
// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //  response.send("Hello from Firebase!");
// // });

// const DialogflowApp = require("actions-on-google").DialogflowApp;

// exports.receiveAssistantRequests = functions.https.onRequest(
//   (request, response) => {
//     const app = new DialogflowApp({ request: request, response: response });

//     function handlerRequest(app) {
//       const device = app.getArgument("devices");
//       const status = app.getArgument("status");

//       return admin
//         .database()
//         .ref(`/automation/${device}/value`)
//         .set(status)
//         .then(snapshot => {
//           app.ask(
//             `Ok, switching ${device} ${status}. Do you want to control anything else?`
//           );
//         });
//     }
//     app.handleRequest(handlerRequest);
//   }
// );

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const { dialogflow } = require("actions-on-google");
const app = dialogflow();

const setCharAt = (str, index, chr) => {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
};

const statusChecker = status => {
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
    .then(snapshot => {
      snapshot.val();
    });
};

// const sensorController = sensor => {

//   switch (sensor) {
//     case 'light':

//      return admin
//       .database()

//       .ref(`/sensorstatus/command`)
//       .once('value')
//       .then(snapshot => {
//     snapshot.val()
//       }).then(
//         command => {
//           admin.database().ref('sensorstatus/')
//           .update({
//             command: setCharAt(command, statusChecker(status), 0),
//           });
//         }
//       );

//   case 'fan':
//     return admin
//       .database()

//       .ref(`/sensorstatus/command`)
//       .once('value')
//       .then(snapshot => {
//     snapshot.val()
//       }).then(
//         command => {
//           admin.database().ref('sensorstatus/')
//           .update({
//             command: setCharAt(command, statusChecker(status), 1),
//           });
//         }
//       );
//   }

app.fallback((conv, { devices, status }) => {
  // return admin
  //   .database()
  //   // .ref(`/iotday/${devices}/value`)
  //   .ref(`/sensorstatus/command`)
  //   .set(status)
  //   .then(snapshot => {
  //     conv.ask(
  //       `Ok, switching ${devices} ${status}. Do you want to control anything else?`
  //     );
  //   });

  // return admin
  //   .database()
  //   .ref("sensorstatus/")
  //   .update({
  //     command: setCharAt(currentSensorStatus(), 0, statusChecker(status))
  //   })
  //   .then(snapshot => {
  //     conv.ask(
  //       `Ok, switching ${devices} ${status}. Do you want to control anything else?`
  //     );
  //   });

  switch (devices) {
    case "light":
      return admin
        .database()
        .ref(`/sensorstatus/command`)
        .once("value")
        .then(snapshot => {
          console.log(snapshot.val());
          return admin
            .database()
            .ref("sensorstatus/")
            .update({
              command: setCharAt(snapshot.val(), 0, statusChecker(status))
            })
            .then(snapshot => {
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
        .then(snapshot => {
          console.log(snapshot.val());
          return admin
            .database()
            .ref("sensorstatus/")
            .update({
              command: setCharAt(snapshot.val(), 1, statusChecker(status))
            })
            .then(snapshot => {
              conv.ask(
                `Ok, switching ${devices} ${status}. Do you want to control anything else?`
              );
            });
        });
    case "door":
      return admin
        .database()
        .ref(`/sensorstatus/command`)
        .once("value")
        .then(snapshot => {
          console.log(snapshot.val());
          return admin
            .database()
            .ref("sensorstatus/")
            .update({
              command: setCharAt(snapshot.val(), 2, statusChecker(status))
            })
            .then(snapshot => {
              conv.ask(
                `Ok, switching ${devices} ${status}. Do you want to control anything else?`
              );
            });
        });
  }
});

exports.receiveAssistantRequests = functions.https.onRequest(app);
