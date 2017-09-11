"use strict";
var express = require('express');
var contentHandler = require("./js/ContentHandler");
contentHandler = new contentHandler();

//Init
var app = express();
app.set('view engine', 'pug');


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

app.use(function(req, res){
    res.send("404 Not Found");
});

app.listen(1247);
console.log("Listening on Port 1247");