//Music/sound volume adjustments
$("#bg-music").prop("volume", 0.1);
$("#scream").prop("volume", 0.2);


/*	Event listener: acts on splash screen click
	Fades splash screen out and begins game
*/
$("#splash-screen").click(function(){
	$("#bg-music").get(0).play();
	$(this).fadeOut("slow", function(){
		
		playGame();
	});
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
			$("#end-score").text(score);
			$("#ending-screen").modal();
		}
	}, 1000);

	//Mole popup function/interval
	//50% chance of pop up if hidden or hide if already up
	var mole_interval = setInterval(function() {
		$.each(mole_slots, function(slot_index, value) {
			if (Math.floor(Math.random() * 2) == 1 && $(this).not(":animated")) {
				if ($(this).is(":hidden") && $(this).not(":animated")) {
					var random_index = Math.floor(Math.random() * mole_types.length);
					$(this).attr("src","moles/" + mole_types[random_index] + ".png");
					$(this).show(0);
					$(this).animate({bottom: "-15px"}, 2000);
				}
				else {
					$(this).animate({bottom: "-165px"}, 2000, function() {
						$(this).hide();
					});
				}
			}
		});
	}, 1000);
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
	if (!image_url.includes("whacked")) {
		//mole animation
		$(this).stop(true)
			   .delay(150)
			   .queue(function(next){
					$(this).attr("src",image_url.replace(".png", "-whacked.png"));
					next(); //keeps queue moving; used instead of dequeue()
				})
			   .delay(100)
			   .animate({bottom: "-165px"}, 2000, function() {
					$(this).hide();
				});
		
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
		
		if(image_url.includes("trustee"))
			 $("#scream").get(0).play();
		 
		//score increase (might add animation)
		$("#score").text(score+=10);
	}
});


/*	Acts on game ending modal button
	Resets game and resumes gameplay
	Can be replaced by "onclick = playGame()" in HTML (but I prefer to keep all functions in JS file)
*/
$("#play-again").click(playGame);