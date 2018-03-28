var express= require('express');
var app=express();
var path= require('path');
var cookieParser= require('cookie-parser');
var session= require('express-session');
var config = require('./config/config.js');
var ConnectMongo= require('connect-mongo')(session);

//setting up the views folder
app.set('views', path.join(__dirname,'views'));

//installing the hogan express as a templating engine
app.engine('html', require('hogan-express'));

//setting the view engine
app.set('view engine', 'html');

//setting the path of all the css and image folder
app.use(express.static(path.join(__dirname, 'public')));

/*app.route('/').get(function(req,res,next){
	//res.send('<h1>Hello world!!</h1>');
	res.render('index',{title: 'Welcome to ChatCAT'});
});*/

//getting the router
require('./routes/route.js')(express,app);

app.use(cookieParser());
//app.use(session({secret: 'Sakshi@123', resave: true,saveUninitialized: true}));


//setting the env variable
var env = process.env.Node_Js||'development';
if(env === 'development')
{
	//development mode settings
	console.log("development");
	app.use(session({secret: config.secretSession}));
}
else
{
	//production mode settings
	console.log("production");
	app.use(session({
		secret: config.secretSession,
		store: new ConnectMongo({
			url: config.dbUrl,
			stringify: true,
		})
	}));
}

app.listen(8000, function(){
	console.log("Application running on port 8000");
})