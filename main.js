var seconds_left = 60;
var time_interval = setInterval(function() {
	$("#time-left").text(--seconds_left);
	if (seconds_left == 0) {
		clearInterval(time_interval);
		alert("Game over");
	}
}, 1000);

var test_score = 0;
var score_interval = setInterval(function() {
	$("#score").text(++test_score);
}, 1000);


$(".mole").click(function() {
	$(this).attr("src","moles/student1-whacked.png");
	$(this).css("transform", "translate3d(0,150px,0)");
	var score = parseInt($("#score").text());
	$("#score").text(score+10);
});