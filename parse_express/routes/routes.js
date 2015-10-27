var helper = require('../util/helperfunctions.js');

module.exports = function(app){

	app.get('/', function (req, res) {
		res.redirect('/Home');
	});
				
	app.get('/home', function (req, res) {
		res.render('home', {title: 'Home'});
	});

	app.get('/table', function (req, res) {
		var blacklist = []//[4,5,13,14,15,16,17,18,30,31,32,19,20,21,22,23,24,25,26,27,28,29]
		var results = helper.getData();	
		res.render('table', {	title: 'Table',
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
		var multer  = require('multer');
		var upload = multer({ dest: 'uploads/'});
		
		//console.log(req.files.file.name);
		//console.log(req.files.file.path);
		//console.log(req.files.file.type);

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
		res.send(helper.parseData(req));
	});

	app.get('/graph', function(req, res){
		res.render('graph', {title: 'Graph'});
	});

	app.get('/moregraphs', function(req, res){
		res.render('moreGraphs', {title: 'More graphs'});
	});
	
	app.get('/index', function (req, res) {
   res.status(404).send('Sorry, we cannot find that!');
	});
}