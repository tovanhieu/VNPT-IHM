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

};
