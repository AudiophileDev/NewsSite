let fs = require('fs');

class ContentHandler{
    constructor(){
        this._articleCounter = 0;
        this._articleJSON;
        this.init();
    }

    getArticle(ID){
        for(var i = 0; i < this._articleJSON.length; i++){
            if(this._articleJSON[i].id == ID){
                return {
                    title: this._articleJSON[i].title,
                    content: this._articleJSON[i].content
                }
            }
        }

        return {
            title: "Article not found",
            content: ""
        }
    }

    getArticles(){
        //return this._articleJSON;
        var articles = [];

        for(var i = 0; i < this._articleJSON.length; i++){
            articles.push({
                id: this._articleJSON[i].id,
                title: this._articleJSON[i].title,
                content: this._articleJSON[i].content.slice(0, 150) + "..."
            })
        }
        return articles;
    }

    addArticle(title, content){

    }

    init(){
        console.log("Loading articles...");
        this._articleJSON = JSON.parse(fs.readFileSync("articles/articles.json"));
        console.log("Loaded articles");

        for(var article in this._articleJSON){
            if(article.id > this._articleCounter){
                this._articleCounter = article.id;
            }
        }
    }
}

module.exports = ContentHandler;