module.exports= function(express, app){
   
    var router= express.Router();

    router.get('/', function(req,res,next){
        res.render('index.html', {title: 'Welcome to ChatCAT'});
    });
    
    router.get('/chatrooms', function(req, res, next){
        res.render('chatrooms.html',{title: 'Chatroom'});
        console.log(req.session);
    });
    
    router.get('/setdata', function(req,res,next){
        req.session.colorname="red";
        res.send('session object value set!!!');
    });

    router.get('/getdata', function(req,res,next){
        res.send("Value of color set in session is -"+ (req.session.colorname));
    });

    app.use('/',router);
};