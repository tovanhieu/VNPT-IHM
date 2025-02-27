var listDeviceIP = ["10.36.90.7", "10.36.90.14"];
var deviceUser = "admin";
var devicePassword = "Ttcntt@2016";
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors()); // Cho phép frontend gửi request
app.use(express.static("public"));

//make way for some custom css, js and images
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/fonts", express.static(__dirname + "/public/font"));
app.use("/imgs", express.static(__dirname + "/public/img"));

var os = require("os");
if (os.platform() == "win32") {
  var chilkat = require("@chilkat/ck-node23-win64");
} else if (os.platform() == "linux") {
  if (os.arch() == "arm") {
    var chilkat = require("@chilkat/ck-node23-linux-arm");
  } else if (os.arch() == "arm64") {
    var chilkat = require("@chilkat/ck-node23-linux-arm64");
  } else {
    var chilkat = require("@chilkat/ck-node23-linux-x64");
  }
} else if (os.platform() == "darwin") {
  var chilkat = require("@chilkat/ck-node23-mac-universal");
}

app.post("/button-click", (req, res) => {
  const { button } = req.body;
  var glob = new chilkat.Global();
  var success = glob.UnlockBundle("Anything for 30-day trial");
  if (success !== true) {
    console.log(glob.LastErrorText);
    return;
  }

  var status = glob.UnlockStatus;
  if (status == 2) {
    console.log("Unlocked using purchased unlock code.");
  } else {
    console.log("Unlocked in trial mode.");
  }

  if (button === "button1") {
    controlDevice(listDeviceIP[0], deviceUser,devicePassword);
    res.json({ message: `Reboot switch 1 7th floor sucessfully` });
  } else {
    controlDevice(listDeviceIP[1], deviceUser,devicePassword);
    res.json({ message: `Reboot switch 2 7th floor sucessfully` });
  }
});

var server = app.listen(8000, function () {
  var port = server.address().port;
  console.log("Server started at http://localhost:%s", port);
});
function controlDevice(devIP, devUser, devPass){
    var ssh = new chilkat.Ssh();

  var success = ssh.Connect(devIP, 22);
  if (success !== true) {
    console.log(ssh.LastErrorText);
    return;
  }

  // Authenticate using login/password:
  success = ssh.AuthenticatePw(devUser, devPass);
  if (success !== true) {
    console.log(ssh.LastErrorText);
    return;
  }


  // Start a shell session.
  var channelNum = ssh.QuickShell();
  if (channelNum < 0) {
    console.log(ssh.LastErrorText);
    return;
  }

  // If the CISCO switch returns a prompt with "#", then read until we get the prompt.
  // (It's not actually required that we do this, but it helps to know that all is OK at this point..)
  success = ssh.ChannelReceiveUntilMatch(channelNum, "#", "utf-8", true);
  if (success !== true) {
    console.log(ssh.LastErrorText);
    return;
  }

  // Show what we received so far:
//   console.log(ssh.GetReceivedText(channelNum, "utf-8"));

  // Send a "show clock" command.
  success = ssh.ChannelSendString(channelNum, "show clock\n", "utf-8");
  // Read the output to the next interactive prompt.
  success = ssh.ChannelReceiveUntilMatch(channelNum, "#", "utf-8", true);
  if (success !== true) {
    console.log(ssh.LastErrorText);
    return;
  }
  //   console.log(ssh.GetReceivedText(channelNum, "utf-8"));
  // Send another command 
    // success = ssh.ChannelSendString(channelNum,"reload\n","utf-8");
    // success = ssh.ChannelSendString(channelNum,"Y\n","utf-8");
    ssh.Disconnect();
    console.log("Success reboot device: ", devIP);
}

