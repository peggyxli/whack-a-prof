//Music/sound volume adjustments
$("#bg-music").prop("volume", 0.0);
$("#scream").prop("volume", 0.2);


/*	Event listener: acts on splash screen click
	Fades splash screen out and begins game
*/
$("#splash-screen").click(function(){
	$("#bg-music").get(0).play();
	$(this).fadeOut("slow", playGame);
});


var mole_slots = $(".mole");
var mole_types = ["student1", "student2", "professor1", "professor2", "dean1", "dean2", "trustee"];
var score = 0;

/*	Main gameplay function
	Resets game
	Starts timer countdown
	Starts mole popups
*/
function playGame() {
	$("#score").text(score=0);
	var seconds_left = 60;
	
	//Timer function/interval
	var time_interval = setInterval(function() {
		$("#time-left").text(--seconds_left);
		if (seconds_left == 0) { //Ending game stuff
			clearInterval(time_interval);
			clearInterval(mole_interval);
			$.each(mole_slots, function() {
				$(this).stop(true).hide();
				$(this).css("bottom", "-165px");
			});
			
			//Show ending screen stuff
			$("#ending-score").text(score);
			$("#ending-screen-bg").fadeIn();
			$("#ending-screen").fadeIn(200);
			$("#diploma-frame").animate({top: "25px"})
		}
	}, 1000);

	//Mole popup function/interval
	var mole_interval = setInterval(function() {
		var open_mole_slots = $(".mole").filter(':hidden');
		var random_slot = open_mole_slots[Math.floor(Math.random() * open_mole_slots.length)];
		
		var random_index = Math.floor(Math.random() * mole_types.length);
		$(random_slot).attr("src","moles/" + mole_types[random_index] + ".png");
		$(random_slot).show(0)
					  .animate({bottom: "-15px"}, 2000)
					  .delay(1000)
					  .animate({bottom: "-165px"}, 2000, function() {
						$(this).hide();
					  });
	}, 750);
	
	//Event listener: acts on "end game" link click
	$("#end-game").click(function() {
		clearInterval(time_interval);
		clearInterval(mole_interval);
		$.each(mole_slots, function() {
			$(this).stop(true).hide();
			$(this).css("bottom", "-165px");
		});
		
		//Show ending screen stuff
		$("#ending-score").text(score);
		$("#ending-screen-bg").fadeIn();
		$("#ending-screen").fadeIn(200);
		$("#diploma-frame").animate({top: "25px"})
	});
}


/*  Event listener: acts on mole click 
	(Pulled outside of playGame because the animations act weird inside playGame; probably has something to do with jQuery queues)
	Makes the mole disappear
	Displays an animated hammer
	Plays sound effect(s)
	Increases score
*/
$(".mole").click(function() {
	var image_url = $(this).attr("src");
	if (!image_url.includes("whacked") && parseInt($(this).css("bottom"), 10) > -120) {
		//mole animation
		$(this).stop(true)
			   .delay(150)
			   .queue(function(next){
					$(this).attr("src",image_url.replace(".png", "-whacked.png"));
					next(); //keeps queue moving; used instead of dequeue()
				})
			   .delay(150)
			   .animate({
				   bottom: "-165px",
				   opacity: 0
			   }, 500, function() {
				   $(this).css("opacity", "1");
				   $(this).hide(0);
			   });
		// $(this).delay(100).fadeOut(600);
		
		//hammer animation
		var my_hammer = $(this).parent().next();
		my_hammer.fadeIn(100).addClass("hammer-smash");
		my_hammer.delay(200).fadeOut(200, function() {
			$(this).removeClass("hammer-smash");
		});
		
		//sound effect - might need work
		var audio = document.createElement("audio");
		audio.src = "bonk.mp3";
		// audio.addEventListener("ended", function () {
			// document.removeChild(this);
		// }, false);
		audio.play();
		// $("#bonk").get(0).play();
		
		//score increase (might add animation)
		if(image_url.includes("trustee")) {
			$("#scream").get(0).play();
			score+=100;
		} else if (image_url.includes("dean")) {
			score+=60;
		} else if (image_url.includes("professor")) {
			score+=30;
		} else {
			score+=10;
		}
		$("#score").text(score);
	}
});


/*	Acts on game ending screen button
	Resets game and resumes gameplay
*/
$("#play-again-wrapper").click(function() {
	$("#ending-screen").fadeOut();
	$("#ending-screen-bg").fadeOut();
	playGame();
});


$("#diploma-credits").click(function() {
	$("#credits-screen").fadeIn(function(){
		$("#credits-developers").slideDown(2000);
	});
});

$("#credits-close").click(function() {
	$("#credits-screen").fadeOut(function() {
		$("#credits-developers").hide();
		$("#credits-sources").hide();
		$("#credits-next").show();
		$("#credits-back").hide();
	});
});

$("#credits-next").click(function() {
	$(this).fadeOut();
	$("#credits-developers").stop(true).slideUp(750, function() {
		$("#credits-sources").slideDown(2000);
		$("#credits-back").fadeIn();
	});
});

$("#credits-back").click(function() {
	$(this).fadeOut();
	$("#credits-sources").stop(true).slideUp(750, function() {
		$("#credits-developers").slideDown(2000);
		$("#credits-next").fadeIn();
	});
});