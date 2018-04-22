$("#bg-music").prop("volume", 0.1);

var seconds_left = 60;
var time_interval = setInterval(function() {
	$("#time-left").text(--seconds_left);
	if (seconds_left == 0) {
		clearInterval(time_interval);
		clearInterval(mole_interval);
		
		alert("Game over");
	}
}, 1000);

var mole_slots = $(".mole");
var mole_types = ["student1", "student2", "professor1", "professor2", "dean1", "dean2", "trustee"];

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


$(".mole").click(function() {
	var image_url = $(this).attr("src");
	if (image_url.search("whacked") == -1) {
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

		//score increase (might add animation)
		var score = parseInt($("#score").text());
		$("#score").text(score+10);
	}
});