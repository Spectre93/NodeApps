var express = require('express');
var path = require('path');
var app = express();

var multer  = require('multer');
var upload = multer({ dest: 'uploads/'});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.get('/index', function (req, res) {
   res.status(404).send('Sorry, we cannot find that!');
});

var blacklist = []//[4,5,13,14,15,16,17,18,30,31,32,19,20,21,22,23,24,25,26,27,28,29]

/* 

"Date":"2015/08/10"
"Time":"14:05:00"
"Basal Rate (U/h)"
"BG Reading (mmol/L)"

"Temp Basal Amount"
"Temp Basal Type"
"Temp Basal Duration (h:mm:ss)"

"Bolus Type"
"Bolus Volume Selected (U)"
"Bolus Volume Delivered (U)"
"Programmed Bolus Duration (h:mm:ss)"

"BWZ Estimate (U)"
"BWZ Target High BG (mmol/L)"
"BWZ Target Low BG (mmol/L)"
"BWZ Carb Ratio (g/U)"
"BWZ Insulin Sensitivity (mmol/L/U)"
"BWZ Carb Input (grams)"
"BWZ BG Input (mmol/L)"
"BWZ Correction Estimate (U)"
"BWZ Food Estimate (U)"
"BWZ Active Insulin (U)"


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
	res.render('home', {title: 'Home'});
});

function getData(){
	var baby = require("babyparse");
	var fs = require('fs');
	var file = fs.readFileSync("public/files/veelData.csv").toString();
	var file = fs.readFileSync("public/files/betereData.csv").toString();

	return baby.parse(file, {	
		header: true,					//First row will be interpreted as field names.
		fastMode: true,				//Speeds up parsing for files that contain no quotes.
		skipEmptyLines: true,	//Skips empty lines.
		dynamicTyping: true,	//Numeric and boolean data will be converted to their type.
		delimiter: ";" 				//The delimiting character. Leave blank to auto-detect.
	});
}

app.get('/table', function (req, res) {
	var results = getData();	
	res.render('table', {title: 'Table',
												Results: results,
												Blacklist: blacklist})
});

app.get('/searching', function(req, res){
	var val = req.query.search;
  res.send(val);
});

app.get('/upload', function(req, res){
	res.render('upload', {title: 'Upload'});
});

app.post('/file_upload', function (req, res) {
	console.log(req.files.file.name);
  console.log(req.files.file.path);
  console.log(req.files.file.type);

	var file = __dirname + "/" + req.files.file.name;
	fs.readFile( req.files.file.path, function (err, data) {
			fs.writeFile(file, data, function (err) {
				  if( err ){
							console.log( err );
				  }else{
							 response = {
									 message:'File uploaded successfully',
									 filename:req.files.file.name
							};
					}
					console.log( response );
					res.end( JSON.stringify( response ) );
		 });
	});
});

app.get('/getGraphData', function(req, res){
 	var inputData = getData();
	var resultData = [];
		for(var i = 0; i < inputData.data.length; i++){
			var resultObject = {};
			var currentEntry = inputData.data[i];
			
			var date 									= currentEntry.Date + " " + currentEntry.Time;
			var basalRate 						= currentEntry["Basal Rate (U/h)"];
			var bgReading 						= currentEntry["BG Reading (mmol/L)"];
			var bolusVolumeSelected 	= currentEntry["Bolus Volume Selected (U)"];
			var bolusVolumeDelivered 	= currentEntry["Bolus Volume Delivered (U)"];
			var bwzCarbInputG 				= inputData.data[i]["BWZ Carb Input (grams)"];
			
			if(basalRate != ""){						resultObject.basalRate 						= basalRate;}
			if(bgReading != ""){						resultObject.bgReading 						= bgReading;}			
			if(bolusVolumeSelected != ""){	resultObject.bolusVolumeSelected 	= bolusVolumeSelected;}
			if(bolusVolumeDelivered != ""){	resultObject.bolusVolumeDelivered = bolusVolumeDelivered;}			
			if(bwzCarbInputG != ""){				resultObject.bwzCarbInputG 				= bwzCarbInputG;}
			
			if(Object.keys(resultObject).length != 0){	//if empty object, don't add the date				
				//if(date > "2015/01/01 00:00:00" && date < "2015/05/01 00:00:00"){
				if(date >= "10/08/2015 00:00:00" && date <= "11/08/2015 00:00:00"){
					resultObject.date = date;
					resultData.push(resultObject);
				}
			}
		}
		resultData.sort(function (a, b) {
			if (a.date > b.date)
				return 1;
			else if (a.date < b.date)
				return -1;
			else 
				return 0;
		});
  res.send(resultData);
	//res.send();
});

app.get('/graph', function(req, res){
  res.render('graph', {title: 'Graph'});
});

if (app.get('env') === 'development')
	app.locals.pretty = true;

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Listening at http://%s:%s", host, port);
});