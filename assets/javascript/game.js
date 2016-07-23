

$(document).ready(function(){
	
	var playerSelected = false;
	var enemySelected = false;

	var wins=0;
	var attackConstant;
	var constant=0;

	var buttonPlayerThis;
	var buttonEnemyThis;

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
		button.data('id', characterList[i].id);
		button.data('jediName', characterList[i].jediName);
		button.data('health', characterList[i].health);
		button.data('attack', characterList[i].attack);
		button.data('counterAttack', characterList[i].counterAttack);
		button.attr('id', characterList[i].id);

		// var healthTag = $('<p>').append(characterList[i].health).append('</p>');
		

		button.html(characterList[i].jediName + '<br>' + characterList[i].img).append( '<br> <p id="healthTag"> ' + characterList[i].health + '</p>' );
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
					buttonPlayerThis=$(this);
					$(this).appendTo('#selectedCharacter').attr('active', true);
					console.log($(this).attr('active'));
				}
			}
		}
		else if(playerSelected == true && enemySelected == false){

			if($('#selectedCharacter').children().length && $(this).attr('active')){
				console.log("already selected a main character... please select an enemy character");
			}else{
				enemySelected = true;
				buttonEnemyThis = $(this);
				$('#enemyDefenderList').append(this);
			}
			
		}

	});

	$('.attackButton').on('click', function(){
		console.log('Attack button clicked');

		if(playerSelected==true && enemySelected==true){
			// var laser = new Audio("assests/sound/laserAttack.mp3");
			// laser.play();

			var healthEnemy = buttonEnemyThis.data('health');
			var attackEnemy = buttonEnemyThis.data('attack');
			var counterEnemy = buttonEnemyThis.data('counterAttack');

			var healthCharacter = buttonPlayerThis.data('health');
			var attackCharacter = buttonPlayerThis.data('attack');
			var counterCharacter = buttonPlayerThis.data('counterAttack');

			var newHealthEnemy = healthEnemy - attackCharacter;
			var newHealthCharacter = healthCharacter;
			var newAttackCharacter = attackCharacter;

			
				//first attack, Figure out constant attack variable
				if(constant == 0 ){
					constant++;
					attackConstant = buttonPlayerThis.data('attack');

					newHealthCharacter = newHealthCharacter - counterEnemy; 
					newAttackCharacter = newAttackCharacter;
					buttonPlayerThis.data('attack', newAttackCharacter);
					buttonEnemyThis.data('health', newHealthEnemy);
					buttonPlayerThis.data('health',newHealthCharacter);


					$('#healthTag').empty().append(buttonPlayerThis.data('health'));

					$('#stats').append("you attacked " + buttonEnemyThis.data('jediName') + " for " + buttonPlayerThis.data('attack') + 
						"<br>" + buttonEnemyThis.data('jediName') + " attacked you for " + buttonEnemyThis.data('counterAttack')+ " damage.");

					console.log("health player: " + buttonPlayerThis.data('health'));
				 	console.log("attack: " + buttonPlayerThis.data('attack'))
				 	console.log("health enemy: " + buttonEnemyThis.data('health'));
					console.log("constant: "+ attackConstant);

				// atack and set new updated health
				}else if(newHealthEnemy > 0 && constant>0){
					newHealthCharacter = newHealthCharacter - counterEnemy; 
					newAttackCharacter = newAttackCharacter + attackConstant;
						console.log("health player: " + buttonPlayerThis.data('health'));
						console.log("attack: " + buttonPlayerThis.data('attack'))
						console.log("health enemy: " + buttonEnemyThis.data('health'));
					

					if(newHealthCharacter> 0){
						buttonPlayerThis.data('attack', newAttackCharacter);
						buttonEnemyThis.data('health', newHealthEnemy);
						buttonPlayerThis.data('health',newHealthCharacter);

						$('#stats').empty();

						$('#stats').append("you attacked " + buttonEnemyThis.data('jediName') + " for " + buttonPlayerThis.data('attack') + 
						"<br>" + buttonEnemyThis.data('jediName') + " attacked you for " + buttonEnemyThis.data('counterAttack')+ " damage.");

						$('#healthTag').empty().append(buttonPlayerThis.data('health'));
						
						console.log("health player: " + buttonPlayerThis.data('health'));
						console.log("attack: " + buttonPlayerThis.data('attack'))
						console.log("health enemy: " + buttonEnemyThis.data('health'));
					}else{
						buttonPlayerThis.data('health',newHealthCharacter);
						$('#healthTag').empty().append(buttonPlayerThis.data('health'));

						$('#stats').empty();

						$('#stats').append("you have been defeated.. GAME OVER.");

						console.log("health player: " + buttonPlayerThis.data('health'))
;						$('.resetButton').show();
						$('.attackButton').hide();
					}


				}else{
					newAttackCharacter = newAttackCharacter + attackConstant;
					buttonPlayerThis.data('attack', newAttackCharacter);
					wins++;
					enemySelected=false;

					
					
					$('#stats').empty();

					$('#stats').append("you have defeated " + buttonEnemyThis.data('jediName') + ", you can choose to fight another enemy." );

					$('#enemyDefenderList').empty();

				}

				if(wins>2){
				$('.resetButton').show();
				$('.attackButton').hide();


				}

		}else if(playerSelected==true && enemySelected ==false){
			alert("please select an enemy to attack");
		}else {
			alert("please select a starting character");
		}
	});


	$('.resetButton').on('click', function(){
		location.reload();

	});


});

