var fs = require('fs');
var bodyParser = require('body-parser');

function PostText(PostBody, username, tag1, tag2){
  var BodyToPost=["usr","priv","date","body","tag1","tag2","pid","uid"];
      BodyToPost[0] = username;
      BodyToPost[1] = "privacyOption";
      BodyToPost[2] = GetDate();
      BodyToPost[3] = PostBody;
      BodyToPost[4] = tag1;
      BodyToPost[5] = tag2;
      BodyToPost[6] = GetNextPostID();
      BodyToPost[7] = GetUserID(username);
      var newBod = BodyToPost[0].toString()+","+
                  BodyToPost[1].toString()+","+
                  BodyToPost[2].toString()+","+
                  BodyToPost[3].toString()+","+
                  BodyToPost[4].toString()+","+
                  BodyToPost[5].toString()+","+
                  BodyToPost[6].toString()+","+
                  BodyToPost[7].toString();
      console.log('posting : ' + newBod);
      fs.appendFile('./data/posts.txt', newBod, function(err){
      	if(err) throw err;
      });
      console.log('post successful');
}

function GetDate(){
      var today = new Date();
      var date  = today.getFullYear()+"-"+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      return dateTime;
}

function GetUserID(username){
	var ID;
	var UserArray = fs.readFileSync('./data/UserPassw.txt').toString().split('\n');
	for (i=0;i<UserArray.length;i++){
		var check = UserArray[i].split(',');
		if(check[0] == username){
			ID = check[2];
		}
	}
	return ID;
}

function GetNextPostID(){
	var CurrentHighest = 0;
	var postsArray = fs.readFileSync('./data/posts.txt').toString().split('\n');
	for (i=0;i<postsArray.length;i++){
		var check = postsArray[i].split(',');
		if(parseInt(check[6]) > parseInt(CurrentHighest)){
			CurrentHighest = parseInt(check[6]);
		}	
	}
	CurrentHighest = parseInt(CurrentHighest) + 1;
	return CurrentHighest;
		
}

module.exports.PostText = PostText;
