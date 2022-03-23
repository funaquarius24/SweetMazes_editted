$(document).ready(function(){

	var encryptKeySize = 256;
	var decrypteySize = 256;
	var dataToEnceypt = "";
	var dataToDecrypt = "";
	var encryptedOutput = "";
	var decryptedOutput = "";

	
	$( "#encSubmit" ).click(function( eventObject ) {
		var elem = $('#encryptionForm').serializeArray()
		console.log(elem);
		try {
			var encResult = encryptData(elem[0].value, elem[1].value, elem[2].value);
		} catch {
			console.error(error);
			$("#alert-div").delay(100).fadeIn();
			$("#alert-div").delay(4000).fadeOut();
		}
		
		console.log(encResult);
		$('#encryptedOutput').val(encResult);
		
	});

	$( "#decSubmit" ).click(function( eventObject ) {
		var elem = $('#decryptionForm').serializeArray()
		console.log(elem);

		try {
			var decResult = decryptData(elem[0].value, elem[1].value, elem[2].value);
		} catch (error) {
			console.error(error);
			$("#alert-div").delay(100).fadeIn();
			$("#alert-div").delay(4000).fadeOut();

			return;
		}
		
		console.log(decResult);
		$('#decryptedOutput').val(decResult);
		
	});
	
	// Encryption
	const encryptData = (dataToEncrypt, password, encryptKeySize) => {
		GibberishAES.size(parseInt(encryptKeySize) );	
		// var key = GibberishAES.h2a(password); //sha256 of "password"
		enc = GibberishAES.enc(dataToEncrypt, password);

		return enc;
	}

	// Decryption
	const decryptData = (dataToDecrypt, password, decryptKeySize) => {
		GibberishAES.size(parseInt(decryptKeySize) );	
		const dec = GibberishAES.dec(dataToDecrypt, password)
		console.log("Decrypt: ", dec);

		return dec;
	}
	
	
});