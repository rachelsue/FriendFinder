let friends = require("../data/friends");


module.exports = function(app) {
    // get request which returns a json of our current friends array at the api/friends route.
    app.get("/api/friends", function(req, res) {
      res.json(friends);
    });

//post request that takes data submitted on front end, computes and returns match.
app.post("/api/friends", function(req, res) {
 
  let newFriend = req.body; //this is all of the user's data
  let newFriendScores = req.body.scores; //convert user's scores into an array. 
  let totalDifference = 0; //initialize number var for difference between user scores and rest of friend scores
  let comparedScores = [];
  let friendMatch = { //create an object for the match so we can send it back to the AJAX request.  
    name: "",
    photo: "",
  }

  for (var i = 0; i < friends.length; i++) { // looping through all friends objects
    for (var j = 0; j < 10; j++) { //another loop to go through friends' scores array
    //compares user score array to all other friend scores to calculate absolute difference (Math.abs).
      totalDifference +=  Math.abs(parseInt(friends[i].scores[j] - parseInt(newFriendScores[j]))); 
    } 
    comparedScores.push(totalDifference);
    totalDifference = 0;

  }
  let friendMatchIndex = (comparedScores.indexOf(Math.min(...comparedScores)));

  friendMatch.name = friends[friendMatchIndex].name;
  friendMatch.photo = friends[friendMatchIndex].photo;
  //push the new friend into our friends object and then send it back to the front end to use with Ajax request.
  friends.push(newFriend)
  res.json(friendMatch);

}
);

}