const express = require("express");
const app = express();
const http = require("http").Server(app).listen(8081);
const upload = require("express-fileupload");
var shell = require('shelljs');
var fs = require('fs');
console.log("server started");
app.use(upload());

app.get("/",function(req,res){
	res.sendFile(__dirname+'/index.htm');
	console.log("Get request");
})	


app.post("/",function(req,res){

	console.log("Post request");
	if (Object.keys(req.files).length == 0) {
		return res.status(400).send('No files were uploaded.');
	}

	var testFile = req.files.testFile;
	var filedata=testFile.data;
	
	//Content of data which will upload by user it will copy in script.sh
	fs.writeFile('script.sh', filedata, function (err) {
		if (err) throw err;
		console.log('script made !!!');

		//Permission for execution of script.sh file
		shell.chmod('733','./script.sh');

		//Execute file of script.sh
		console.log("-----------------------------------Execution start-----------------------------------");	
		response= shell.exec("./script.sh");
		console.log("-----------------------------------Execution End-------------------------------------");
			
		//output file of script.sh will store in temp file for storing in database
		fs.writeFile('temp', response.stdout, function (err) {
			if (err) throw err;
			console.log('output store in file !!!');
			//It will send an output to user in json format
			res.json({output : response.stdout});
			
			//It will call db.js file which contain database connectivity and database entry code
			if(require('./db.js').db()){
				console.log("Data successfully inserted !!!");
			}else{
				console.log("There is creativity in code");
			}
		});	
	});	
})
