$(document).ready(function(){
	var playerSelected = false;
	var enemySelected = false;

	var characterSelected=[];
	var enemyList=[];

	var characterList= [

		{
			id:"brent", 
			jediName: "Brent Skywalker" ,
			health: 120,
			attack: 8,
			counterAttack: 10,
			img:"<img src=\"assets/images/brent.PNG\">"
		},
		{
			id:"bob", 
			jediName: "Bob Maul" , 
			health: 80,
			attack: 15,
			counterAttack:25,
			img:"<img src='assets/images/bob.PNG' >"
		},
		{
			id:"dwight", 
			jediName: "Darth dwight" , 
			health:100,
			attack:5,
			counterAttack: 5,  
			img:"<img src='assets/images/dwight.PNG' >"
		},
		{
			id:"nigel", 
			jediName: "Nigel Kenobi" , 
			health: 100,
			attack: 20,
			counterAttack: 25,
			img:"<img src='assets/images/nigel.PNG' >"
		}
	];

// hide reset button at start of game
	$('.resetButton').hide();

// display initial character list for selection
	for(var i =0; i < characterList.length; i++){
		var button = $('<button/>');
		button.addClass('characterId '+ characterList[i].id);
		button.attr('data-id', characterList[i].id);
		button.attr('data-jediName', characterList[i].jediName);
		button.attr('data-health', characterList[i].health);
		button.attr('data-attack', characterList[i].attack);
		button.attr('data-counterAttack', characterList[i].counterAttack);
		button.attr('id', characterList[i].id);

		button.html(characterList[i].img);
		$("#innitialCharacterStaging").append(button);
	}

//click function for selecting characters
	$(".characterId").on('click', function(){
		console.log("test:character hxas been selected");
		// console.log($(this), $(this)[0]);

		if(playerSelected == false){
			playerSelected = true;
			
			for(var i =0; i < characterList.length; i++){
				if ($(this).attr('id') != characterList[i].id){
					$('#enemyAttackList').append($("#innitialCharacterStaging"));
				}else{


					$(this).appendTo('#selectedCharacter').attr('active', true);

					// $('#selectedCharacter').append(this)
					// this.attr('active', true);
					console.log($(this).attr('active'));
				}
			}
		}
		else if(playerSelected == true && enemySelected == false){

			if($('#selectedCharacter').children().length && $(this).attr('active')){
				console.log("already selected main character");
			}else{
				enemySelected = true;
				$('#enemyDefenderList').append(this);
			}
			
		}

	});

	$('.attackButton').on('click', function(){
		console.log('Attack button clicked');

		if(playerSelected==true && enemySelected==true){

		}else if(playerSelected==true && enemySelected ==false){
			alert("please select an enemy to attack");
		}else {
			alert("please select a starting character");
		}
	});

});