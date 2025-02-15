jQuery.validator.setDefaults({
	debug: false,
	success: "valid"
});;

jQuery.validator.addMethod("letters", function(value, element) { 
	  return this.optional(element) || /^[a-zA-Z]+$/.test(value); 
}, "Please enter only letters.");

jQuery.validator.addMethod("slashDate", function(value, element) { 
	  return this.optional(element) || /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value); 
}, "Please enter a valid date. (d/m/y)");

$(document).ready(function(){
	$("#regform").validate({
		rules: {
			nino: {
				required: true,
				minlength: 8,
			},
			fname: {
				required: true,
				letters: true
			},
			lname: {
				required: true,
				letters: true
			},
			address: {
				required: true
			},	
			passcode: {
				minlength: 6
			},	
			phone: {
				required: true,
				digits: true,
				minlength: 10
			},
			birthdate: {
				required: true,
				slashDate: true
			},
			usern: {
				required: true,
				minlength: 2
			},	
			passwd: {
				minlength: 5
			},
			email: {
				required: true,
				email: true
			},
		}
	});
});
//Select The Right Option (From The Database)
$(document).ready(function() {
	var gender = $("#genderValue").val();
	var city = $("#cityValue").val();
	
	if( !$.isNull("#genderValue") && !$.isNull("#cityValue") ) {
		$("#gender").val(gender);
		$("#city").val(city);
	}
});