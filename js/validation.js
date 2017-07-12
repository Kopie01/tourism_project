

	var ValidFirstName = false;
	var ValidLastName = false;
	var ValidEmail = false;
	var ValidPassword = false;
	var ValidConfirmPassword = false;

$(document).ready(function(){
    $('html').animate({scrollTop:0}, 1);
    $('body').animate({scrollTop:0}, 1);

    $(window).on('load', function() {
	    setTimeout(function(){
	        $('html, body').scrollTop(0);
	    }, 0);
	});
	

	// Validate First Name
	$("#firstName").blur(function(){
		var firstNameErrors = $(this).parent().find('span.input-errors');
		firstNameErrors.empty();
		//This element is required
		if($(this).val().length === 0){
			firstNameErrors.text("This is required").removeClass("success").addClass("error");
			return;
		}
		
		// Max Length 20
		if($(this).val().length > 20){
			firstNameErrors.text("This field cannot be more than 20 characters").removeClass("success").addClass("error");
			return;
		}
		firstNameErrors.text("There are no errors").removeClass("error").addClass("success");
		ValidFirstName = true;
	});


	//Validate Last Name

	$("#lastname").blur(function(){
		var lastNameErrors = $(this).parent().find('span.input-errors');
		lastNameErrors.empty();
		//This element is required
		if($(this).val().length === 0){
			lastNameErrors.text("This is required").removeClass("success").addClass("error");
			return;
		}
		
		//Max Length 20
		if($(this).val().length > 20){
			lastNameErrors.text("This field cannot be more than 20 characters").removeClass("success").addClass("error");
			return;
		}
		ValidLastName = true;
		lastNameErrors.text("There are no errors").removeClass("error").addClass("success");
		
	});



	//Validate Email
	$("#email")
		.focus(function(){
			if($(this).val().length === 0){
				$(this).parent().find('span.input-errors').empty();
				$(this).parent().find('span.input-errors').append("<ul class='error'></ul>");
				$(this).parent().find('span.input-errors ul').append(
						"<li class='required'>This is required</li>"
						);
				}
		}).blur(function(){

		}).keyup(function(){
			if($(this).val().length !== 0 ){
				$(this).parent().find('span.input-errors .required').remove();
			} else if( ($(this).val().length === 0) && ( $("li.required").length === 0) ) {
				$(this).parent().find('span.input-errors ul').append("<li class='required'>This is required</li>");
			}
			var emailPattern = /[a-z0-9._-]+@[a-z0-9.-_]+\.[a-z]{2,4}/i;
			if($(this).val().match(emailPattern)){
				$(this).parent().find('span.input-errors .email').remove();
			} else if( (!$(this).val().match(emailPattern)) && ($("li.email").length === 0) ){
				$(this).parent().find('span.input-errors ul').append("<li class='email'>Must be a valid Email</li>");
			}
			if($(this).parent().find('span.input-errors ul li').length === 0){
				ValidEmail = true;
			}

	});


	//Validate Password
	$("#password")
		.focus(function(){
			if($(this).val().length === 0){
				$(this).parent().find('span.input-errors').empty();
				$(this).parent().find('span.input-errors').append("<ul class='error'></ul>");
				$(this).parent().find('span.input-errors ul').append(
						"<li class='required'>This is required</li>"+
						"<li class='uppercase'>Must include at least 1 Uppercase character</li>"+
						"<li class='numbers'>Must include at least 3 Numbers</li>"+
						"<li class='special'>Must include at least 1 Special Character</li>"

						);
				}
		}).blur(function(){

		}).keyup(function(){
			if($(this).val().length !== 0 ){
				$(this).parent().find('span.input-errors .required').remove();
			} else if( ($(this).val().length === 0) && ( $("li.required").length === 0) ) {
				$(this).parent().find('span.input-errors ul').append("<li class='required'>This is required</li>");
			}

			var uppercasePattern = /(?=(.*[A-Z])).{1,}/;
			if($(this).val().match(uppercasePattern)){
				$(this).parent().find('span.input-errors .uppercase').remove();
			} else if( (!$(this).val().match(uppercasePattern)) && ($("li.uppercase").length === 0) ){
				$(this).parent().find('span.input-errors ul').append("<li class='uppercase'>Must include at least 1 Uppercase Character</li>");
			}
			var numbersPattern = /(?=(.*[0-9]){3,}).{3,}/;
			if($(this).val().match(numbersPattern)){
				$(this).parent().find('span.input-errors .numbers').remove();
			} else if( (!$(this).val().match(numbersPattern)) && ($("li.numbers").length === 0) ){
				$(this).parent().find('span.input-errors ul').append("<li class='numbers'>Must include at least 3 Numbers</li>");
			}
			var specialPattern = /(?=(.*[!#$%^&+=])).{1,}/;
			if($(this).val().match(specialPattern)){
				$(this).parent().find('span.input-errors .special').remove();
			} else if( (!$(this).val().match(specialPattern)) && ($("li.special").length === 0) ){
				$(this).parent().find('span.input-errors ul').append("<li class='special'>Must include at least 1 Special Character</li>");
			}

			if($(this).val() === $('#confirmPassword').val()){
				$('#confirmPassword').parent().find('span.input-errors .match').remove();
			} else if( ($(this).val() !== $('#confirmPassword').val()) && ( $("li.match").length === 0) ) {
				$('#confirmPassword').parent().find('span.input-errors ul').append("<li class='match'>Password must match</li>");
			}

			if($(this).parent().find('span.input-errors ul li').length === 0){
				ValidPassword = true;
			}

		});

	$("#confirmPassword")
		.focus(function(){
			if($(this).val().length === 0){
				$(this).parent().find('span.input-errors').empty();
				$(this).parent().find('span.input-errors').append("<ul class='error'></ul>");
				$(this).parent().find('span.input-errors ul').append(
						"<li class='required'>This is required</li>"+
						"<li class='match'>Password must match</li>"
						);
				}
		}).blur(function(){

		}).keyup(function(){
			if($(this).val().length !== 0 ){
				$(this).parent().find('span.input-errors .required').remove();
			} else if( ($(this).val().length === 0) && ( $("li.required").length === 0) ) {
				$(this).parent().find('span.input-errors ul').append("<li class='required'>This is required</li>");
			}

			if($(this).val() === $('#password').val() ){
				$(this).parent().find('span.input-errors .match').remove();
				ValidConfirmPassword = true;
			} else if( ($(this).val() !== $('#password').val()) && ( $("li.match").length === 0) ) {
				$(this).parent().find('span.input-errors ul').append("<li class='match'>Password must match</li>");
			}
		});


});
	
	

$("#submitButton").click(function(){
			event.preventDefault();

var mainBox = document.getElementById("mainbox");
var mainImage = $("#tablettop").css("background-image");

  if (ValidFirstName === true && ValidLastName === true && ValidEmail === true && ValidPassword === true && ValidConfirmPassword === true 
  	){
    $("body").css("overflow", "auto");
    $(mainBox).hide();
    $(mainImage).hide();
 
    
  }
});
