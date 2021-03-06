var foldheight = 80;

var main = function(){

	//show hide control
	$(".showhidecontrol").bind("click",function () {
		$(".header").toggle();
		$(".nav").toggle();
	})

	//QR Open Control
	$(".lec-qr").bind("click",function(){
		$(".qr-popout").fadeIn(400);
	})

	$(".qrclosebtn").bind("click",function(){
		$(".qr-popout").fadeOut(200);
	})

	//post frame control

	$(".newquest-btn").click(function(){
		$(".ask-popout").fadeIn(400);

	})

	$(".askclosebtn").click(function(){
		$(".ask-popout").fadeOut(200);
		$(".inputbox").val("");
		$('.postbtn').addClass('uni-disabled');
	    $('.postbtn').attr("disabled","disabled");
	})

	var askername = $(".username").text();
	var askerimgsrc = $(".userimg").attr("src");


	$(".askername").text(askername);
	$(".askerimg").attr("src",askerimgsrc);
	$(".askerimg-mobile").attr("src",askerimgsrc);

	// input text control

	$('.inputbox').keyup(function() {
	    var postLength = $(this).val().length;
	    var charactersLeft = 400 - postLength;
	   //   $('.counter').text(charactersLeft); 
  
	    if(charactersLeft < 0) {
	      $('.postbtn').addClass('uni-disabled'); 
	      $('.postbtn').attr("disabled","disabled");
	    }
	    else if(charactersLeft == 400) {
	      $('.postbtn').addClass('uni-disabled');
	      $('.postbtn').attr("disabled","disabled");
	    }
	    else {
	      $('.postbtn').removeClass('uni-disabled');
	      $('.postbtn').removeAttr("disabled");
	    }
    });    

// post click

	$(".postbtn").click(function(){
		console.log("postbtn clicked");
		
		var newquestioncontent= $(".questionframe").html();
		var newquestion = $("<div>").html(newquestioncontent);
		newquestion.addClass("questionframe");
		$(".questionlist").append(newquestion);

		console.log(askername);

		//customize question frame
		var asktext = $(".inputbox").val();
		$(".questionframe").last().find(".ques-userimg").attr("src",askerimgsrc);
		$(".questionframe").last().find(".questiontext").text(asktext).prepend('<span class="ques-username">Host: </span>');
		$(".questionframe").last().find(".ques-username").text(askername+": ");
		$(".questionframe").last().find(".votenum").text("0");


	    //clear input box
		$(".inputbox").val("");
		$('.postbtn').addClass('uni-disabled');
	    $('.postbtn').attr("disabled","disabled");

	    $(document.body).animate({scrollTop:$(".questionframe").last().offset().top}, 600 );
		$(".ask-popout").fadeOut(200);

	})

	$(document).on('click', ".votebtn",voteevent);
	$(document).on('click', ".questiontext",unfoldevent);
	//question unfold control
	


};

// vote event control

var voteevent = function(){
		$(this).toggleClass("uni-greenpressed")

		if ($(this).text() === "Vote"){
		   $(this).text("Undo");
		   var addcount =parseInt($(this).prev().text())+1;
		   $(this).prev().text(addcount.toString());
		}
		else{
		   $(this).text("Vote");
		   var cutcount =parseInt($(this).prev().text())-1;
		   $(this).prev().text(cutcount.toString());
		};
}

var unfoldevent= function(){
	foldheight = $(".questiontext").innerHeight();

	console.log("the foldheight is "+foldheight);
	console.log($(this));
	console.log("foldheight is "+foldheight);
	console.log("offsetHeight is "+this.offsetHeight);
	console.log("scrollHeight is "+this.scrollHeight);


	if(this.offsetHeight > foldheight){
	    console.log("fold");
		$(this).innerHeight(foldheight);
	}	

	else if(this.scrollHeight > foldheight){
		console.log("unfold");
		$(this).innerHeight(this.scrollHeight);
	}

}


$(document).ready(main);