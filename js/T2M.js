let fs = require('fs');
let exec = require('child_process').exec;

class T2M{
    constructor(){
        this._exec = require('child_process').exec;
        this.init();
    }

    _execute(path){
        var child = exec('test.bat', function (error, stdout, stderr){
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if(error !== null){
                console.log('exec error: ' + error);
            }
        });
    }

    init(){
        console.log("bla");
    }
}

module.exports = T2M;