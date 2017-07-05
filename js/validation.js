$(document).ready(function(){

	var ValidFirstName = false;
	var ValidLastName = false;
	var ValidEmail = false;
	var ValidPassword = false;
	var ValidConfirmPassword = false;

	//When the submit button is pressed
	$("#submitButton").click(function(event){
		event.preventDefault();
	});

	//Blur is when you have left an element
	$("#firstName").blur(function(){
		var firstNameErrors = $(this).parent().find('span.input-errors');
		firstNameErrors.empty();
		//This element is required
		if($(this).val().length === 0){
			firstNameErrors.text("This field is required").removeClass("success").addClass("error");
			return;
		}
		//Min Length 5
		if($(this).val().length < 5){
			firstNameErrors.text("This field requires at least 5 characters").removeClass("success").addClass("error");
			return;
		}
		//Max Length 20
		if($(this).val().length > 20){
			firstNameErrors.text("This field cannot be more than 20 characters").removeClass("success").addClass("error");
			return;
		}
		firstNameErrors.text("There are no errors").removeClass("error").addClass("success");
		ValidFirstName = true;
	});


	//Validate Last Name

	//Blur is when you have left an element
	$("#lastname").blur(function(){
		var firstNameErrors = $(this).parent().find('span.input-errors');
		firstNameErrors.empty();
		//This element is required
		if($(this).val().length === 0){
			firstNameErrors.text("This field is required").removeClass("success").addClass("error");
			return;
		}
		//Min Length 5
		if($(this).val().length < 5){
			firstNameErrors.text("This field requires at least 5 characters").removeClass("success").addClass("error");
			return;
		}
		//Max Length 20
		if($(this).val().length > 20){
			firstNameErrors.text("This field cannot be more than 20 characters").removeClass("success").addClass("error");
			return;
		}
		firstNameErrors.text("There are no errors").removeClass("error").addClass("success");
		ValidFirstName = true;
	});



	//Validate Email
	$("#email")
		.blur(function(){
			if($(this).val().length === 0){
				$(this).parent().find('span.input-errors').empty();
				$(this).parent().find('span.input-errors').append("<ul class='error'></ul>");
				$(this).parent().find('span.input-errors ul').append("<li class='required'>This is required</li>"
					+"<li class='email'>Must be a valid Email</li>"
						)
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
				$(this).parent().find('span.input-errors ul').append("<li class='email'>Must be a valid Email</li>")
			}
			if($(this).parent().find('span.input-errors ul li').length === 0){
				ValidEmail = true;
			}

	});





	//Validate Password
	//Focus is when you are actually in an element
	$("#password")
		.blur(function(){
			if($(this).val().length === 0){
				$(this).parent().find('span.input-errors').empty();
				$(this).parent().find('span.input-errors').append("<ul class='error'></ul>");
				$(this).parent().find('span.input-errors ul').append(
						"<li class='required'>This is required</li>"+
						"<li class='uppercase'>Must include at least 1 Uppercase character</li>"+
						"<li class='numbers'>Must include at least 3 Numbers</li>"+
						"<li class='special'>Must include at least 1 Special Character</li>"

						)
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
				$(this).parent().find('span.input-errors ul').append("<li class='uppercase'>Must include at least 1 Uppercase Character</li>")
			}
			var numbersPattern = /(?=(.*[0-9]){3,}).{3,}/;
			if($(this).val().match(numbersPattern)){
				$(this).parent().find('span.input-errors .numbers').remove();
			} else if( (!$(this).val().match(numbersPattern)) && ($("li.numbers").length === 0) ){
				$(this).parent().find('span.input-errors ul').append("<li class='numbers'>Must include at least 1 Uppercase Character</li>")
			}
			var specialPattern = /(?=(.*[!#$%^&+=])).{1,}/;
			if($(this).val().match(specialPattern)){
				$(this).parent().find('span.input-errors .special').remove();
			} else if( (!$(this).val().match(specialPattern)) && ($("li.special").length === 0) ){
				$(this).parent().find('span.input-errors ul').append("<li class='special'>Must include at least 1 Uppercase Character</li>")
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
		.blur(function(){
			if($(this).val().length === 0){
				$(this).parent().find('span.input-errors').empty();
				$(this).parent().find('span.input-errors').append("<ul class='error'></ul>");
				$(this).parent().find('span.input-errors ul').append(
						"<li class='required'>This is required</li>"+
						"<li class='match'>Password must match</li>"
						)
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
			} else if( ($(this).val() !== $('#password').val()) && ( $("li.match").length === 0) ) {
				$(this).parent().find('span.input-errors ul').append("<li class='match'>Password must match</li>");
			}
		});


});
