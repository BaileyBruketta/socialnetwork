var fs = require('fs');
var bodyParser = require('body-parser');

function OrderByID(posts){

var reorderedposts = posts;

//sort by id
for (i=0;i<reorderedposts.length-1;i++){
	var placeholder = reorderedposts;
	var x = reorderedposts[i].split(',');
	var y = reorderedposts[i+1].split(',');
	
	if(x[6] > y[6]){
		reorderedposts[i]=placeholder[i+1];
		reorderedposts[i+1]=placeholder[i];
	}
}

//reverse output
reorderedposts = reorderedposts.reverse();


return reorderedposts;

}


module.exports.OrderByID = OrderByID;
