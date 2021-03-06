"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var contentHandler = require("./js/ContentHandler");
contentHandler = new contentHandler();

var T2M = require("./js/T2M");
T2M = new T2M();

//Init
var app = express();
app.set('view engine', 'pug');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


//Routing
app.get("/", function(req, res){
    res.render("index", {
        articles: contentHandler.getArticles()
    })
});

app.get("/articles/:id", function(req, res, next){
    var articleID = req.params.id;
    res.render("article", {
        article: contentHandler.getArticle(articleID)
    });
});

app.get("/api/articles/:id", function(req, res, next){
    var articleID = req.params.id;
    var article = contentHandler.getArticle(articleID);
    res.send(article);
});

app.get("/SoundFiles/:fileName", function(req, res){
    console.log("Sending sound file...");
    let fileName = req.params.fileName;
    res.sendFile(__dirname + "/SoundFiles/" + fileName);
});

app.get("/playground", function(req, res){
    res.render("playground");
});

app.post("/playground/submit", function(req, res){
    var requestOptions = T2M.getRequestOptions(req.body);
    T2M.createSoundFile(requestOptions, function (error, pathToSoundFile) {
        if(error !== null){
            return res.send("Error occurred creating sound file: " + error);
        }
        //return res.send("Created sound file: " + pathToSoundFile);
        res.render("playgroundPlayer", {
            title: requestOptions.title,
            text: requestOptions.text,
            pathToSoundFile: "/" + pathToSoundFile
        })
    });
});

app.use(function(req, res){
    res.send("404 Not Found");
});

app.listen(1247);
console.log("Listening on Port 1247");