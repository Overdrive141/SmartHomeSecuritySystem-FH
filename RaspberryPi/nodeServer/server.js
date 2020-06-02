const express = require("express");
const app = express();
const pitemp = require("pi-temperature");
const PiCamera = require("pi-camera");
const http = require("http");
const server = require("http").createServer(app);

const io = require("socket.io")(server);

const { PythonShell } = require("python-shell");
const { exec } = require("child_process");
const { spawn } = require("child_process");

const { admin } = require("./config");

app.use(express.json());

const db = admin.database();
const ref = db.ref("users/141/notification_token");

app.get("/testnewnd", (req, res) => {
  //TODO: Firebase Neighborhood State ON

  let options = {
    scriptPath: "/home/pi/Desktop",
    pythonOptions: ["-u"],
    mode: "text"
  };
  // exec("workon cv");
  PythonShell.run("trystr.py", options, function(err, results) {
    if (err) throw err;
    console.log(results);
  });
});

app.post("/opencv", (req, res) => {
  // const ls = spawn('workon cv && cd neighborhood && python testing.py');
  // ls.stdout.on('data', (data) => {
  //     console.log(`stdout: ${data}`);
  //   });

  //   ls.stderr.on('data', (data) => {
  //     console.error(`stderr: ${data}`);
  //   });

  //   ls.on('close', (code) => {
  //     console.log(`child process exited with code ${code}`);
  //   });

  // PythonShell.run('testing.py', {scriptPath: '/home/pi/nodetest/neighborhood', pythonOptions: ['-u'], mode: 'text'}, function(err, results) {
  //     if(err) throw err;
  //     console.log('results: %j', results);

  // });

  const messageNotification = {
    notification: {
      title: "Suspicious Activity Detected",
      body:
        "We have detected suspicious activity outside your house. Please click on the Start Livestream button to see what's happening."
    },
    data: {
      channelId: "NeighborHood"
    }
  };
  const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };

  io.on("connection", socket => {
    console.log("client connected");
    socket.on("disconnect", function() {
      console.log("user disconnected");
    });
  });

  server.listen(3000, () => {
    console.log("server started");
  });

  let shell = new PythonShell("letssee.py", {
    scriptPath: "/home/pi/nodetest/neighborhood",
    pythonOptions: ["-u"],
    mode: "text"
  });

  shell.on("message", function(message) {
    // if () {
    console.log(message);
    io.emit("logentry", message);

    ref.once("value", function(event) {
      const data = event.val();
      console.log(data);
      admin
        .messaging()
        .sendToDevice(data, messageNotification, options)
        .then(response => {
          console.log(response);
          res.status(200).send("Notification sent successfully");
        })
        .catch(error => {
          console.log(error);
        });
    });

    // }
  });

  console.log("SHELL");

  shell.on("close", function(message) {
    console.log(message + "1");
    exec("pkill python 3");
  });
  shell.on("error", function(message) {
    console.log(message + "2");
    exec("pkill python 3");
  });
  shell.on("stderr", function(message) {
    console.log(message + "3");
    exec("pkill python 3");
  });

  //     if(error){
  //         console.error(`spawn error: ${error}`);
  //     }
  //     console.log(`stdout: ${stdout}`);
  //     console.log(`stderr: ${stderr}`);
  // });
});

app.get("/killcv", (req, res) => {
  exec("pkill python3");
  server.close();
  console.log("FIRE22D");
});

app.get("/cameraonly", (req, res) => {
  //   const server = http.createServer(function(request, response) {
  const child = exec(
    'raspivid -o - -t 0 -hf -w 640 -h 480 -fps 30 |cvlc -vvv stream:///dev/stdin --sout "#standard{access=http,mux=ts,dst=:8160}" :demux=h264'
    // "raspivid -n -t 0 -w 640 -h 480 -fps 30 -o | nc 192.168.200.3 8160"
  );

  // const child = exec("sudo service motion start");

  child.stdout.pipe(res);

  if (child.error) {
    console.log("ERROR: ", child.error);
    return res.json({ error: "error starting steam" });
  }

  // child.on("stderr", function(message) {
  //   console.log(message + "3");
  //   exec("pkill python3");
  // });

  console.log("Live stream started on " + 8160);
  // console.log("stdout: ",child.stdout);
  // console.log("stderr: ",child.stderr);
  // console.log("exist code: ",child.status);
  return res.json({ camera: "camera is up" });
});
//   const PORT = 8080;
//   server.listen(PORT);
//   console.log("Server is listening on" + PORT);

// });

app.get("/killcam", (req, res) => {
  exec("pkill raspivid");
  // exec("sudo service motion stop");
  console.log("FIRED");
  return res.json({ camera: "camera is down" });
});

app.get("/", (req, res) => {
  console.log("Status was Checked");
  res.json({ status: "ONLINE" });
});

// ESP Status Monitor
// CO2 - 0
// Gesture - 1
// NFC - 2
// Light - 3
// Fan - 4
// Lock - 5
// app.get("/sensorstatus/:id", (req, res) => {
//   let str = "000000";

//   switch (req.params.id) {
//     case "0":
//       str = setCharAt(str, 0, "1");
//       break;
//     case "1":
//       str = setCharAt(str, 1, "1");
//       return res.send(str);
//     case "2":
//       str = setCharAt(str, 2, "1");
//       return res.send(str);
//     case "3":
//       str = setCharAt(str, 3, "1");
//       return res.send(str);
//     case "4":
//       str = setCharAt(str, 4, "1");
//       return res.send(str);
//     case "5":
//       str = setCharAt(str, 5, "1");
//       return res.send(str);
//   }

//   if (!req.params) {
//     res.send(str);
//   }
// });

// app.get("/sensorstatus", (req, res) => {
//   // switch (req.params.id) {
//   //   case "1":
//   //     return res.send("1");
//   // }
//   let str = "00011";
//   str = setCharAt(str, 4, "0");
//   return res.send(str);
// });

// function setCharAt(str, index, chr) {
//   if (index > str.length - 1) return str;
//   return str.substring(0, index) + chr + str.substr(index + 1);
// }

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
