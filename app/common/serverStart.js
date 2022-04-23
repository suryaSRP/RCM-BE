//var libs = require('./common/libs');
//var app = libs.express(); // define our app using express
//app.use(libs.bodyParser.urlencoded({
//	extended: true
//}));
//app.use(libs.bodyParser.json());
//var port = process.env.PORT || 3000; // set our port
//// ROUTES FOR OUR API
//// =============================================================================
//var router = libs.express.Router(); // get an instance of the express Router
//// test route to make sure everything is working (accessed at GET http://localhost/api)
//router.get('/', function (req, res) {
//	res.json({
//		message: 'hooray! welcome to our api!'
//	});
//});
//// more routes for our API will happen here
//// REGISTER OUR ROUTES -------------------------------
//// ROUTES FOR OUR API
//// =============================================================================
//router.use(function (req, res, next) {
//	// do logging
//	console.log('Something is happening.');
//	next(); // make sure we go to the next routes and don't stop here
//});
//// test route to make sure everything is working (accessed at GET http://localhost/api)
//router.get('/', function (req, res) {
//	res.json({
//		message: 'hooray! welcome to our api!'
//	});
//});
//app.use('/api', router);
//// START THE SERVER
//// =============================================================================
//app.listen(port);
//console.log('API service started at Port : ' + port);
//module.exports = {
//	app: app
//	, router: router
//	, port: port
//}