let fs = require('fs');
let exec = require('child_process').exec;

class T2M{
    constructor(){
        this.init();
    }

    getRequestOptions(body){
        return {
            title: body.Title,
            text: body.Text,
            preciseSearch: body.PreciseSearch,
            optionsDropDown: body.OptionsDropDown
        };
    }

    createSoundFile(requestOptions, callback){
        if(requestOptions.text.length < 1){
            return callback("No Text provided", null);
        }

        let that = this;
        this._createFile(requestOptions, function (error, pathToTextFile) {
            if(error !== null){
                return callback("Error creating file: " + error, null)
            }

            that._executeT2M(pathToTextFile, requestOptions, function (error, pathToSoundFile) {
                if(error !== null){
                    return callback("Error executing T2M: " + error, null)
                }
                return callback(null, pathToSoundFile);
            });
        });
    }

    _createFile(requestOptions, callback){
        let fileName = requestOptions.title.replace(/ /g,'') + ".txt";
        fs.writeFile("TextFiles/" + fileName, requestOptions.text, function(error) {
            if (error){
                return callback("Cannot create File. FS Error: " + error, null);
            }
            return callback(null, "TextFiles/" + fileName);
        });
    }

    _executeT2M(pathToTextFile, requestOptions, callback){
        //articleFile outputFile -db databaseFile -[output] [mp3 wav midi play ] -[precise] -db databaseFile
        let callString =
            pathToTextFile.replace(/ /g,'') + " " +
            "SoundFiles/" + requestOptions.title.replace(/ /g,'') + ".wav" + " " +
            "-output wav" + " " +
            "-db T2M/wordsDB.csv" + " ";
        console.log(callString);

        if(requestOptions.preciseSearch){
            callback = callback + "-precise";
        }

        let child = exec("java -jar T2M/t2m.jar " + callString, function (error, stdout, stderr){
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if(error !== null){
                return callback(Error, null);
            }

            return callback(null, "SoundFiles/" + requestOptions.title.replace(/ /g,'') + ".wav");
        });
    }

    init(){

    }
}

module.exports = T2M;