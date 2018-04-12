var seconds_left = 60;
var time_interval = setInterval(function() {
	$("#time-left").text(--seconds_left);
	if (seconds_left == 0) {
		clearInterval(time_interval);
		clearInterval(mole_interval);
		alert("Game over");
	}
}, 1000);


var mole_array = $(".mole");
var mole_interval = setInterval(function() {
	$.each(mole_array, function() {
		if (Math.floor(Math.random() * 2) == 1) {
			if ($(this).hasClass("mole-hide")) {
				$(this).attr("src","moles/student1.png");
				$(this).removeClass("mole-hide");
			}
			else {
				$(this).addClass("mole-hide");
			}
		}
	});
}, 1000);


$(".mole").click(function() {
	$(this).attr("src","moles/student1-whacked.png");
	$(this).addClass("mole-hide");
	var score = parseInt($("#score").text());
	$("#score").text(score+10);
});