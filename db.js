exports.db = function() {
	var fs = require('fs');
	var mysql = require('mysql');

	var con = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "",
		  database: "ubuntu_api"
	})

	//it will fetch a output from temp file
	var  out_file = {
	    output_file: fs.readFileSync(__dirname+'/temp'),
	};

	//Database connectivity
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	});

	//It will insert data into database
	var query = con.query('INSERT INTO sh_output SET ?', out_file, function(err,result) {
		if (err) throw err;
		console.log("Insert entry");
		
	});

	//It will close a connection
	con.end(function(err) {
		if (err) throw err;
		console.log("Connection Close");	
	});
}
