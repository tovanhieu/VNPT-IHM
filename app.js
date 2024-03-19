var express = require("express");

var app = express();

app.use(express.static('public'));

//make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/fonts', express.static(__dirname + '/public/font'));
app.use('/imgs', express.static(__dirname + '/public/img'));

var server = app.listen(8000, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});

