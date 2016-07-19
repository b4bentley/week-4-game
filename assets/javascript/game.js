$(document).ready(function(){
	var characterList= [

		{
			id:"brent", 
			jediName: "Brent Skywalker" , 
			img:"<img src=\"assets/images/brent.PNG\">"
		},
		{
			id:"bob", 
			jediName: "Bob Maul" , 
			img:"<img src='assets/images/bob.PNG' >"
		},
		{
			id:"dwight", 
			jediName: "Darth dwight" , 
			img:"<img src='assets/images/dwight.PNG' >"
		},
		{
			id:"nigel", 
			jediName: "Nigel Kenobi" , 
			img:"<img src='assets/images/nigel.PNG' >"
		}];


	for(var i =0; i < characterList.length; i++){
		console.log(i);
		var button = $('<button/>');

		button.html(characterList[i].img);

		$("#innitialCharacterStaging").append(button);
	}
});