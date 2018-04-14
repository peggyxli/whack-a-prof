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
		image_url = image_url.replace(".png", "-whacked.png");
		$(this).attr("src",image_url);
		$("#bonk").get(0).play();
		$(this).stop(true).animate({bottom: "-165px"}, 2000, function() {
			$(this).hide();
		});
		var score = parseInt($("#score").text());
		$("#score").text(score+10);
	}
});