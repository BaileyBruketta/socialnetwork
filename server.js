const express = require('express');
var ejs = require('ejs');
const port = 3000;
const app = express();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var LoChe = require('./scripts/loginScript');
var FeedLo = require('./scripts/FeedLoader');
var MakePo = require('./scripts/MakePost');
var Sorter = require('./scripts/sort');

app.use(express.static(__dirname + '/public'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

//HomePage
app.get('/',function(req,res){
	res.render("login");
});

app.get('/home',function(req,res){
	if(req.session.loggedin){
	  res.render("homepage", {username: req.session.username, Sec: "home"});
	}else{
	  res.send('Please login to view this page.');
	}
	res.end();
});

app.get('/music',function(req,res){
	if(req.session.loggedin){
	//load music here
	//render page here
	}else{
		res.redirect('/');
	}
});	

app.get('/posts',function(req,res){
	if(req.session.loggedin){
	var feedresp = FeedLo.LoadPosts(req.body.org, req.session.username);
            feedresp = Sorter.OrderByID(feedresp);
		res.render("posts/posts", {username: req.session.username, Sec: "posts", feedTo: feedresp});
	for (i=0;i<feedresp.length;i++){
		console.log(feedresp[i]);
	}
	}else{
		res.redirect('/');
	}
});

app.post('/auth', function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	if (username && password){
		if(LoChe.CheckLogin(username,password) == "Logged"){
			req.session.loggedin=true;
			req.session.username = username;
			res.redirect('/home');
		}else{
		res.send('incorrect credentials');
		}
		res.end();
	}
});

app.post('/makepost', function(req,res){
	console.log("make post request recieved");
	MakePo.PostText(req.body.PostBody, req.session.username, req.body.tag1, req.body.tag2);
	res.redirect('/posts');
	res.end();	
});


app.listen(port);

console.log('LISTENING ON PORT ${port}...');
