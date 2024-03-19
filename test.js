// Way 1
var os = require('os');
console.log(os.platform())
console.log(os.arch())
if (os.platform() == 'win32') {
    if (os.arch() == 'ia32') {
        var chilkat = require('@chilkat/ck-node17-win-ia32');
    } else {
        var chilkat = require('@chilkat/ck-node17-win64');
    }
} else if (os.platform() == 'linux') {
    if (os.arch() == 'arm') {
        var chilkat = require('@chilkat/ck-node17-arm');
    } else if (os.arch() == 'x86') {
        var chilkat = require('@chilkat/ck-node17-linux32');
    } else {
        var chilkat = require('@chilkat/ck-node17-linux64');
    }
} else if (os.platform() == 'darwin') {
    var chilkat = require('@chilkat/ck-node17-macosx');
}

function chilkatExample() {
    console.log("1")

    // This example assumes the Chilkat API to have been previously unlocked.
    // See Global Unlock Sample for sample code.

    var ssh = new chilkat.Ssh();

    var success = ssh.Connect("10.36.90.7",22);
    if (success !== true) {
        console.log(ssh.LastErrorText);
        return;
    }
    console.log("2")
    // Authenticate using login/password:
    success = ssh.AuthenticatePw("admin","Ttcntt@2016");
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

    console.log("4")

    // If the CISCO switch returns a prompt with "#", then read until we get the prompt.
    // (It's not actually required that we do this, but it helps to know that all is OK at this point..)
    success = ssh.ChannelReceiveUntilMatch(channelNum,"#","utf-8",true);
    if (success !== true) {
        console.log("test")
        console.log(ssh.LastErrorText);
        return;
    }
    console.log("5");

    // Show what we received so far:
    console.log(ssh.GetReceivedText(channelNum,"utf-8"));

    console.log("6");

    // Send a "show clock" command.
    success = ssh.ChannelSendString(channelNum,"show clock\n","utf-8");

    console.log("7");

    // Read the output to the next interactive prompt.
    success = ssh.ChannelReceiveUntilMatch(channelNum,"#","utf-8",true);
    if (success !== true) {
        console.log(ssh.LastErrorText);
        return;
    }
    console.log("8");

    // console.log(ssh.GetReceivedText(channelNum,"utf-8"));

    // // Send another command and get the output, and so on...
    // success = ssh.ChannelSendString(channelNum,"some other command\n","utf-8");
    // success = ssh.ChannelReceiveUntilMatch(channelNum,"#","utf-8",true);
    // if (success !== true) {
    //     console.log(ssh.LastErrorText);
    //     return;
    // }
    // console.log("9");

    // console.log(ssh.GetReceivedText(channelNum,"utf-8"));
    // console.log("10");

    ssh.Disconnect();

}

chilkatExample();
// Way 2
// var host = {
//   server: {
//     host: "10.36.90.7",
//     port: "22",
//     userName: "admin",
//     password: "Ttcntt@2016",
//     hashMethod: "md5",
//     readyTimeout: 50000,
//     tryKeyboard: true,
//     algorithms: {
//       kex: [
//         "diffie-hellman-group1-sha1",
//         "ecdh-sha2-nistp256",
//         "ecdh-sha2-nistp384",
//         "ecdh-sha2-nistp521",
//         "diffie-hellman-group-exchange-sha256",
//         "diffie-hellman-group14-sha1",
//       ],
//       cipher: [
//         "aes128-ctr",
//         "aes192-ctr",
//         "aes256-ctr",
//         "aes128-gcm",
//         "aes128-gcm@openssh.com",
//         "aes256-gcm",
//         "aes256-gcm@openssh.com",
//         "aes256-cbc",
//       ],
//     },
//   },
//   commands: ["show deviceport global", "show deviceport names"],
//   msg: {
//     send: function (message) {
//       console.log("message: " + message);
//     },
//   },
//   verbose: true,
//   debug: true,
//   idleTimeOut: 10000,
//   ["keyboard-interactive"]: function (
//     name,
//     instructions,
//     instructionsLang,
//     prompts,
//     finish
//   ) {
//     console.log("Connection :: keyboard-interactive");
//     console.log(prompts);
//     finish(["<password>"]);
//   },
//   onEnd: function (sessionText, sshObj) {
//     sshObj.msg.send("--------- onEnd has ------------");
//     sshObj.msg.send(sessionText);
//   },
// };

// //Create a new instance
// var SSH2Shell = require("ssh2shell"),
//   SSH = new SSH2Shell(host);

// //Start the process
// SSH.connect();
