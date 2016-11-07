console.log('script.js is running!');
"use strict";

(function (){
//data
var timer = 60;

var candidates = [
  ['Donald Trump', 'project-01/donaldtrump.png', 100],
  ['Hillary Clinton', 'project-01/hillaryclinton.png', 100]
];

  //player = ['Hillary Clinton', 100]
  //opponent = ['Donald Trump', 100]

var donaldTrumpAttack =
  ["Legalize drugs to take profit away from drug cartels",
  "Defend the Second Amendment of our Constitution",
  "Make America energy independent",
  "Incentivize employers to provide childcare at the workplace",
  "Better support for our women veterans",
  "Build a wall along the Mexican border",
  "Place a 45% tariff on Chinese exports to the US",
  "Impose a 20% tax on all imported goods",
  "Order an immediate review of all US cyber defenses and vulnerabilities",
  "Close parts of the Internet to prevent ISIS from attracting recruits",
  "Hillary needs Wall Street money to successfully run her campaign",
  "She'll say anything and change NOTHING"
  ];



var hillaryClintonAttack =
  ["Donald Trump's followers are deplorable",
  "Just like he shouldn't have his finger on the (nuclear) button, Donald shouldn't have his hands on our economy",
  "End the privatization of prisons",
  "Ban military-style weapons",
  "Provide tuition-free community college",
  "Increase public investment in clean energy research and development",
  "Reduce the amount of oil consumed in the US and around the world",
  "Guarantee up to 12 weeks of paid family and medical leave",
  "Invest in partnerships in Latin Ameria, Africa, and Asia",
  "Reduce the cost of prescription drugs",
  "Improve access to housing and job opportunities",
  "Work to close the pay gap"
  ];

  //objects
  Hillary = {name: "Hillary Clinton", attacks: hillaryClintonAttack, credibility: 100};


  Donald = {name: "Donald Trump", attacks: donaldTrumpAttack, credibility: 100};



//game variables
var currentPlayer = Hillary;
var currentOpponent = Donald;
var isOpponentTurn = false;

var currentPlayerMaxHealth =  100;
var currentOpponentMaxHealth = 100;






function updateOpponent(opponentCred){
  $('#opponent .credibility').text('Credibility: ' + opponentCred);
  currentOpponent.credibility = opponentCred
}

function updatePlayer(playerCred){
  $('#player .credibility').text('Credibility: ' + playerCred);
  currentPlayer.credibility = playerCred
}



function getWinner() {
  if (currentOpponent.credibility < currentPlayer.credibility){
    return currentPlayer.name
  } else {
    return currentOpponent.name
  }
}

function gameOver() {
  var winner = getWinner();
  if (winner === currentPlayer.name){
  //opponent loses animation
  $('#opponent_img').addClass('rolloverright');
  $('#player_img').addClass('jumpforever');
  }else if(winner === currentOpponent.name){
    //player loses animation
  $('#player_img').addClass('rolloverleft');
  $('#opponent_img').addClass('jumpforever');
  }
  $('#status_text').text(winner + ' has been elected President of the United States');
  $('#attack_btn').hide();
  $('#recover_btn').hide();
  $('#opponent_attack_btn').hide();
  $('#opponent_recover_btn').hide();
}

//player events
function playerAttack(){ //player has 2 out of 12 chances of missing
  console.log("player attack");
  var playerAttacks = Math.floor(Math.random() * (10 + 2) + 2);
  var statusText =$('#status_text');
  if (playerAttacks <= 3){
    $(statusText).text(Hillary.name + " missed!");
    console.log(Hillary.name + " missed!");
  } else {
    var attackIndex = Math.floor(Math.random() * hillaryClintonAttack.length);//gives a number that is randomized, number between 0 and hightest number in array
    // hillaryClintonAttack[attackIndex];//grabs element from array
    console.log(Hillary.name+' used : '+hillaryClintonAttack[attackIndex]);
    $('#status_text').text(Hillary.name+' used : '+hillaryClintonAttack[attackIndex]);
    var powerofAttack = Math.floor(Math.random() * 21) + 5;
    console.log(powerofAttack);
    var oldCred = $('#opponent .credibility').text();
    oldCred = oldCred.split(' ');
    console.log(oldCred);
    var newCred = Number(oldCred[1]) - powerofAttack;
    if (newCred <= 0) {
    getWinner();
    } else {
    updateOpponent(newCred);
    }
  $('#player_img').removeClass();
  $('#opponent_img').addClass('wiggle');
  }
   isOpponentTurn = true;
    $('#attack_btn').hide();
    $('#recover_btn').hide();
    $('#opponent_attack_btn').show();
    $('#opponent_recover_btn').show();
}



function playerRecover(){
  console.log("player recover");
  var recover = Math.floor(Math.random() *21) + 5;
  var statusText =$('#status_text');
  var oldCred = $('#player .credibility').text();
  oldCred = oldCred.split(' ');
  console.log(oldCred);

  var newCred = Number(oldCred[1]) + recover;
  if (newCred >= currentPlayerMaxHealth){
    statusText.text(currentPlayer.name + " at max credibility!");
    updatePlayer(currentPlayerMaxHealth);
  } else {
    statusText.text(currentPlayer.name + " used: I\'m With Her and recovered " + recover + " points");
    updatePlayer(newCred);
  }
    $('#player_img').addClass('jump');
    $('#opponent_img').removeClass();
    isOpponentTurn = true;
    $('#attack_btn').hide();
    $('#recover_btn').hide();
    $('#opponent_attack_btn').show();
    $('#opponent_recover_btn').show();
}


function opponentRecover(){
  console.log("opponent recover");
  var recover2 = Math.floor(Math.random() *21) + 5;
  var statusText =$('#status_text');
  var oldCred = $('#opponent .credibility').text();
  oldCred = oldCred.split(' ');
  console.log(oldCred);

  var newCred = Number(oldCred[1]) + recover2;

  if (newCred >= currentOpponentMaxHealth){
    statusText.text(currentOpponent.name + " at max credibility!");
    updateOpponent(currentOpponentMaxHealth);
  } else {
    statusText.text(currentOpponent.name + " used: Make America Great Again and recovered " + recover2 + " points");
    updateOpponent(newCred);
  }
  $('#opponent_img').addClass('jump');
  $('#player_img').removeClass();
  isOpponentTurn = false;
    $('#attack_btn').show();
    $('#recover_btn').show();
    $('#opponent_attack_btn').hide();
    $('#opponent_recover_btn').hide();
}


function opponentAttacks(){ //opponent has 2 out of 12 chances of missing
  console.log("opponent attack");
  var opponentAttacks = Math.floor(Math.random() * (10 + 2) + 2);
  var statusText =$('#status_text');
  if (opponentAttacks <= 3){
    $(statusText).text(Donald.name + " missed!");
    console.log(Donald.name + " missed!");

  } else {
    var attackIndex2 = Math.floor(Math.random() * donaldTrumpAttack.length);//gives a number that is randomized, number between 0 and hightest number in array
    //donaldTumpAttack[attackIndex2];//grabs element from array
    console.log(Donald.name+' used : '+donaldTrumpAttack[attackIndex2]);
    $('#status_text').text(Donald.name+' used : '+donaldTrumpAttack[attackIndex2]);
    var powerofAttack = Math.floor(Math.random() * 21) + 5;
    var oldCred = $('#player .credibility').text();
    oldCred = oldCred.split(' ');
    console.log(oldCred);
    var newCred = Number(oldCred[1]) - powerofAttack;
    if (newCred <= 0) {
      gameOver();
    } else {
      updatePlayer(newCred);
    }
    $('#player_img').addClass('wiggle');
    $('#opponent_img').removeClass();
  }
    isOpponentTurn = false;
    $('#attack_btn').show();
    $('#recover_btn').show();
    $('#opponent_attack_btn').hide();
    $('#opponent_recover_btn').hide();
}

//button to switch between player and opponent

function addEventListeners(){
  //hillary's
  $("#attack_btn").click(function(){
   if (!isOpponentTurn) {playerAttack();}
  });
  $('#recover_btn').click(function(){
   if (!isOpponentTurn) playerRecover();
  });

  //trumps
  $("#opponent_attack_btn").click(function(){
   if (isOpponentTurn) {opponentAttacks();}
  });

   $('#opponent_recover_btn').click(function(){
    if (isOpponentTurn) {
      console.log(' ')
      opponentRecover();
    }
   });



}




  // var countdown = setInterval(function(){
  //   timer = timer - 1
  //   $
  // },1000)



//doc ready, add listeners
$(document).ready(function(){
 addEventListeners();
})

var $start = $("#startgame_btn");
$start.click(function() {
  var $timer = 0;
   $('#startgame_btn').hide();
   document.querySelector('#pokemon-battle-song').play()
 var id = setInterval(function() {
    $timer += 1; //adds one second
    $('.time-left').text(timer);
    timer--;
    if ($timer >= 60) {
      clearInterval(id); //stop timer
      console.log("Game over")//if larger than set number than console log game over
      gameOver(); //calls game over function
    }
  }, 1000);
})
})();

