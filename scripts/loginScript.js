var fs = require('fs');

function CheckLogin(userParam, passwParam){
	var linesArray = fs.readFileSync('./data/UserPassw.txt').toString().split('\n');
	//console.log(linesArray[0]);	
	//console.log(linesArray[1]);
	//console.log(linesArray[2]);
	
	var ret = interFunc(linesArray, userParam, passwParam);
	console.log(ret.toString());
	return ret;
}

function interFunc(arrayx,user,pass){
	var retval = ""
	for (i = 0; i < arrayx.length; i++){
		var subArray = arrayx[i].split(',');
		if(subArray[0] == user){
			if(subArray[1] == pass){
				retval="Logged";
			}
		}
	}
	return retval;
}

//CheckLogin('hi','hi');

module.exports.CheckLogin = CheckLogin;
module.exports.interFunc = interFunc;
