var fs = require('fs');
var bodyParser = require('body-parser');

//initiate arrays
function LoadPosts(Selection, username){
	var postsArray = fs.readFileSync('./data/posts.txt').toString().split('\n');
	var userFriends  = fs.readFileSync('./data/FriendsLists.txt').toString().split('\n');
	var UserIds    = fs.readFileSync('./data/UserPassw.txt').toString().split('\n');

//Get the numerical id of a user	
	var IdToUse;
	for (i=0; i< UserIds.length; i++)
	{
		var IDRegister = UserIds[i].split(',');
		if (IDRegister[0] == username)
		{
			IdToUse = IDRegister[2];
			console.log("id to use = " + IdToUse);
		}
		console.log("ran one check");
	}
	
	var SplitOne = userFriends[IdToUse].split(':');
	var ListF = SplitOne[1].replace('{','');
	//list of IdToUse's friends by ID number
	    ListF = ListF.replace('}','');
	    ListF = ListF.split(',');
	    
	var postsToRender = [];
	for (xk = 0; xk < postsArray.length; xk++){
		var parsedPost = postsArray[xk].split(',');
		for(i = 0; i < ListF.length; i++){
		console.log("checking for user# " + ListF[i]);
			if(parsedPost[7] == ListF[i]){
				postsToRender.push(postsArray[xk]);
			}
		}
	}
	return postsToRender;    
	 
}
module.exports.LoadPosts = LoadPosts;
