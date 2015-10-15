var express = require('express');
//var stormpath = require('express-stormpath');
var path = require('path');
var app = express();

app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname, '/views'));
app.set('view engine', 'jade');

// app.use(stormpath.init(app, {
  //apiKeyId: 'xxx',
  //apiKeySecret: 'xxx',
  // application: 'My Application',
  // secretKey: 'verylongrandomkeystringA!@%*BiWka*35DGb&1Ms#P0!v',
	// website: true
// }));

app.get('/index', function (req, res) {
   //res.sendStatus(404)
   res.status(404).send('Sorry, we cannot find that!');
   //res.send('Nothing to do here');
})

var blacklist = [4,5,13,14,15,16,17,18,30,31,32]
/* 
var results = {"data":
0							[{"Index":1,
								"Date":"2015/08/10",
								"Time":"14:05:00",
								"New Device Time":""
								,"BG Reading (mmol/L)":""
5								,"Linked BG Meter ID":""
								,"Basal Rate (U/h)":1.4
								,"Temp Basal Amount":""
								,"Temp Basal Type":""
								,"Temp Basal Duration (h:mm:ss)":""
10								,"Bolus Type":"",
								"Bolus Volume Selected (U)":""
								,"Bolus Volume Delivered (U)":"",
								"Programmed Bolus Duration (h:mm:ss)":"",
								"Prime Type":"",
15								"Prime Volume Delivered (U)":"",
								"Alarm":"",
								"Suspend":"",
								"Rewind":"",
								"BWZ Estimate (U)":"",
20								"BWZ Target High BG (mmol/L)":"",
								"BWZ Target Low BG (mmol/L)":"",
								"BWZ Carb Ratio (g/U)":"",
								"BWZ Insulin Sensitivity (mmol/L/U)":"",
								"BWZ Carb Input (grams)":"",
25								"BWZ BG Input (mmol/L)":"",
								"BWZ Correction Estimate (U)":"",
								"BWZ Food Estimate (U)":"",
								"BWZ Active Insulin (U)":"",
								"Sensor Calibration BG (mmol/L)":"",
30								"Sensor Glucose (mmol/L)":"",
								"ISIG Value":"",
								"Event Marker":""}],
								
								"errors":[],
								"meta":{"delimiter":";","linebreak":"\r\n","aborted":false,"truncated":false,
									"fields":["Index","Date","Time","New Device Time","BG Reading (mmol/L)","Linked BG Meter ID","Basal Rate (U/h)","Temp Basal Amount","Temp Basal Type","Temp Basal Duration (h:mm:ss)","Bolus Type","Bolus Volume Selected (U)","Bolus Volume Delivered (U)","Programmed Bolus Duration (h:mm:ss)","Prime Type","Prime Volume Delivered (U)","Alarm","Suspend","Rewind","BWZ Estimate (U)","BWZ Target High BG (mmol/L)","BWZ Target Low BG (mmol/L)","BWZ Carb Ratio (g/U)","BWZ Insulin Sensitivity (mmol/L/U)","BWZ Carb Input (grams)","BWZ BG Input (mmol/L)","BWZ Correction Estimate (U)","BWZ Food Estimate (U)","BWZ Active Insulin (U)","Sensor Calibration BG (mmol/L)","Sensor Glucose (mmol/L)","ISIG Value","Event Marker"]}} */							
							
app.get('/', function (req, res) {
	res.render('home', {Title: 'Home'})
})

function getData(){
	var baby = require("babyparse")
	var fs = require('fs')
	var file = fs.readFileSync("public/files/veelData.csv").toString()

	return baby.parse(file, {	
		header: true,					//First row will be interpreted as field names.
		fastMode: true,				//Speeds up parsing for files that contain no quotes.
		skipEmptyLines: true,	//Skips empty lines.
		dynamicTyping: true,	//Numeric and boolean data will be converted to their type.
		delimiter: ";" 			//The delimiting character. Leave blank to auto-detect.
	})
	
	
}

app.get('/table', function (req, res) {
	// var baby = require("babyparse")
	// var fs = require('fs')
	// var file = fs.readFileSync("public/files/veelData.csv").toString()
	
	// var called = false
	// var results = baby.parse(file, {	
		// header: true,					//First row will be interpreted as field names.
		// fastMode: true,				//Speeds up parsing for files that contain no quotes.
		// skipEmptyLines: true,	//Skips empty lines.
		// dynamicTyping: true,	//Numeric and boolean data will be converted to their type.
		// delimiter: ";", 			//The delimiting character. Leave blank to auto-detect.
		// complete: function(results) {	//The callback to execute when parsing is complete.
			// if(!called){
				// called = true;
			// } 
		// }
	// })
	
	var results = getData();
/* 	for(var i = 0; i<results.meta.fields.length; i++){
		if(blacklist.indexOf(i) != -1){
			results.meta.fields[i] = 'undefined';
		}
	}

	for(var i = 0; i<results.data.length; i++){
		
		for(j = 0; j<results.data[i].length; i++){
			if(blacklist.indexOf(j) != -1){
				results.data[i][j] = 'undefined';
			}
		}
		
	} */
	
	res.render('table', {Title: 'Table',
												Results: results,
												Blacklist: blacklist})
})

app.get('/searching', function(req, res){
	var val = req.query.search;
  res.send(val);
});

app.get('/getGraphData', function(req, res){
	// var inputData = getData();
	
	// var resultData = [];
		// for(var i = 0; i < inputData.data.length; i++){
			// if(inputData.data[i]["BWZ Carb Input (grams)"] != ""){
				// resultData.push({date: inputData.data[i].Date + " " + inputData.data[i].Time, value: inputData.data[i]["BWZ Carb Input (grams)"]})
			// }
		// }
		// resultData.sort(function (a, b) {
			// if (a.date > b.date) {
				// return 1;
			// }
			// if (a.date < b.date) {
				// return -1;
			// }
			//a must be equal to b
			// return 0;
		// });
  // res.send(resultData);
	// console.log(resultData);
	res.send();
});

app.get('/graph', function(req, res){
  res.render('graph');
});

if (app.get('env') === 'development')
	app.locals.pretty = true

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

