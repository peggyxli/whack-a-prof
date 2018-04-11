$(".mole").click(function() {
	$(this).attr("src","moles/student1-whacked.png");
	$(this).css("transform", "translate3d(0,150px,0)");
	var score = parseInt($("#score").text());
	$("#score").text(score+10);
});