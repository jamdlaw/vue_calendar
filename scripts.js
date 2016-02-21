/* First script to use jquery to make a div draggable
   and another droppable
  */
var score = 0;
var previousLevel;
var levels = { 
"easy":[
		{
		"name":"above",
		"place":["col2row1", "col3row1"],
		"message":"Place Monkey above the rainbow"
		},
		{
		"name":"beside", 
		"place":["col1row2", "col3row2"],
		"message":"Place Monkey beside the rainbow"
		},
		{
		"name":"below",
		"place":["col1row3", "col2row3", "col3row3"],
		"message":"Place Monkey below the rainbow"
		}
	]
};
$(document).ready(function(){
    "use strict";
	// set the monkey dive
    $("#col1row1").draggable({revert: "invalid"});
	/*
	//let the user select difficulty  
	$(function() {
		$( "#dialog-modal" ).dialog({
		autoOpen: false,
		modal: true,
		buttons: {
		Ok: function() {
			var difficulty = $('#level_select option:selected').val();
			setupLevel(difficulty);
			$(this).dialog( "close" );
			$(message).dialog("open");
		}
		}
	});
	*/
	//dialog for message to the player
	$("#message").dialog({
		autoOpen: false,
		show: {
			effect: "blind",
			duration: 1000
		},
		hide: {
			effect: "explode",
			duration: 1000
		}
	});
    //setupLevel(); 
	//setup modal form that will handel 
	//level changes
	$( "#dialog-form" ).dialog({
		autoOpen: true,
		height: 300,
		width: 350,
		modal: true,
		text: "you did it",
		buttons: {
			New: function(){
				var difficulty = $('#level_select option:selected').val();
				$(this).dialog('close');
				setupLevel(difficulty, 'new');
				},
			Replay: function(){
				$(this).dialog('close');
				setupLevel(difficulty, 'replay');
				}
			}
	});
});
function makeDroppable(droppables){
	// make each div droppable
	$.each( droppables, function(i ,droppable) {
	//console.log(droppable);		
			$('#' + droppable).droppable({
			//actions to take place when object is 
			//droped in the box. 
			drop: function (event, ui) {
				score++;
				$("#dialog-form label").empty();
				$("#dialog-form label").append("you did it! " + score);
				$("#dialog-form").dialog( "open" );
				revert().done(reset);			
				}		
			});
		});
} // end of makeDroppable
//function to create the new droppable divs 
function setupLevel(difficulty, mode = 'new'){
	//clear droppable
	if(typeof level !== 'undefined'){
		clearDroppable(level.place);
	}
	// get the levels for the difficulity
	if (mode == 'new'){
		level = getRandomLevel(difficulty);
	}
	else{
		level = previousLevel;
	}
	//display message
	displayMessage(level.message);
	//set droppable divs
	makeDroppable(level.place);	
	}
function clearDroppable(droppables){
	$.each( droppables, function(i ,droppable) {
			$('#' + droppable).droppable('destroy');
		});
}
function getRandomLevel(difficulty){
	var selectedLevel = levels[difficulty];
	var randomLavel = selectedLevel[Math.floor(Math.random()*selectedLevel.length)];
	if (randomLavel == previousLevel) {
	getRandomLevel();
	}
	return randomLavel;	
}
function displayMessage(message){
	$('#message').empty();
	$('#message').append('<p>' +  message + '</p>');
	$('#message').dialog('open');
}
//call this function to return monkey after 
// level is complete.
var revert = function(){
	$("#col1row1").draggable({revert: "valid"});
	var r = $.Deferred();
	setTimeout(function (){
    // and call `resolve` on the deferred object, once you're done
	r.resolve();
	}, 500);
	// return the deferred object
	return r;		
};
// call this function when monkey is returned 
//to beginning postion	
var reset = function(){
	$("#col1row1").draggable({revert: "invalid"});
	//makeDroppable();
	//setupLevel();
};

