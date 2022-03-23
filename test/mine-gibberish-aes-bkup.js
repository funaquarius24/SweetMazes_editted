$(document).ready(function(){

	var encryptKeySize = 256;
	var decrypteySize = 256;
	var dataToEnceypt = "";
	var dataToDecrypt = "";
	var encryptedOutput = "";
	var decryptedOutput = "";

	// Event setup using the `.on()` method with data
	$( "input" ).on(
		"change",
		function( eventObject ) {
			console.log("An input value has changed! ", eventObject);
		}
	);

	// Preventing a link from being followed
	$( "#encSubmit" ).click(function( eventObject ) {
		var elem = $('#encryptionForm').serializeArray()
		console.log(elem);
		var encResult = encryptData(elem[0].value, elem[1].value, elem[2].value);
		console.log(encResult);

		var key = GibberishAES.h2a(elem[1].value); //sha256 of "password"
		
		console.log(GibberishAES.dec(encResult, key));
	});
	
	// Encryption
	const encryptData = (dataToEncrypt, password, encryptKeySize) => {
		GibberishAES.size(parseInt(encryptKeySize) );	
		var key = GibberishAES.h2a(password); //sha256 of "password"
		console.log("key: ", key);
		enc = GibberishAES.enc(dataToEncrypt, key);
		var openssl = "4j+jnKTSsTBVUJ9MuV8hFEHuxdyT065rYbUqo0gJo1I=\n";
		if (GibberishAES.Base64.encode(enc) == openssl) {
			console.log("Passed!");
		} else {
			console.log("Fail!");
		}

		return enc;
	}
	
	// echo -n "secretsecretsecret" | openssl enc -e -a -aes-128-cbc -K 5e884898da28047151d0e56f8dc62927 -iv 6bbda7892ad344e06c31e64564a69a9a
	// 4j+jnKTSsTBVUJ9MuV8hFEHuxdyT065rYbUqo0gJo1I=   Hex: e23fa39ca4d2b13055509f4cb95f211441eec5dc93d3ae6b61b52aa34809a352
	
	
	// echo -n "secretsecretsecret" | openssl enc -e -a -aes-192-cbc -K 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd6 -iv 6bbda7892ad344e06c31e64564a69a9a
	// g1D8nfnp31TH8jaV3304KP23i6aQhSaU3gubyGtV6WE=		Hex: 8350fc9df9e9df54c7f23695df7d3828fdb78ba690852694de0b9bc86b55e961
	GibberishAES.size(192);	
	var password = GibberishAES.h2a("5e884898da28047151d0e56f8dc6292773603d0d6aabbdd6"); //sha256 of "password"
	var iv = GibberishAES.h2a("6bbda7892ad344e06c31e64564a69a9a");
	var plaintext = GibberishAES.s2a("secretsecretsecret");
	var openssl = "g1D8nfnp31TH8jaV3304KP23i6aQhSaU3gubyGtV6WE=\n";
	enc = GibberishAES.rawEncrypt(plaintext, password, iv);
	if (GibberishAES.Base64.encode(enc) == openssl) {
		console.log("Passed!");
	} else {
		 console.log("Fail!");
	}
	
	// echo -n "secretsecretsecret" | openssl enc -e -a -aes-256-cbc -K 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8 -iv 6bbda7892ad344e06c31e64564a69a9a
	// XUfDIa3urWyzHC1bmfmSQJjaTEXPmKkQYvbCnYd6gFY=		Hex: 5d47c321adeead6cb31c2d5b99f9924098da4c45cf98a91062f6c29d877a8056
	GibberishAES.size(256);	
	var password = GibberishAES.h2a("5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"); //sha256 of "password"
	var iv = GibberishAES.h2a("6bbda7892ad344e06c31e64564a69a9a");
	var plaintext = GibberishAES.s2a("secretsecretsecret");
	var openssl = "XUfDIa3urWyzHC1bmfmSQJjaTEXPmKkQYvbCnYd6gFY=\n";
	enc = GibberishAES.rawEncrypt(plaintext, password, iv);
	if (GibberishAES.Base64.encode(enc) == openssl) {
		console.log("Passed!");
	} else {
		 console.log("Fail!");
	}
	
	
	// Decryption
	console.log("Start");
	GibberishAES.size(128);
	// const te = GibberishAES.dec("U2FsdGVkX19oFXO5twLwt2vUvFvdqtTMBEbIGz92ONQ87TYcZNgZYCdSuc5m7OO8VCNASR5CKU1eqh2qffHsfOmBMPqJfEddSpROXfpi1Tc=", "mmeb1275mpfd")
	// $('#od128').append(te);
	// console.log("te 128: ", te);
	// GibberishAES.size(192);
	// const te1 = GibberishAES.dec("U2FsdGVkX19oFXO5twLwt2vUvFvdqtTMBEbIGz92ONQ87TYcZNgZYCdSuc5m7OO8VCNASR5CKU1eqh2qffHsfOmBMPqJfEddSpROXfpi1Tc=", "mmeb1275mpfd")
	// $('#od192').append();
	// console.log("te 192: ", te1);
	GibberishAES.size(256);
	const te2 = GibberishAES.dec("U2FsdGVkX19oFXO5twLwt2vUvFvdqtTMBEbIGz92ONQ87TYcZNgZYCdSuc5m7OO8VCNASR5CKU1eqh2qffHsfOmBMPqJfEddSpROXfpi1Tc=", "mmeb1275mpfd")
	$('#od256').append(te2);
	console.log("te 256: ", te2);

		
});

function benchmark() {
	//Benchmarks
	
	GibberishAES.size(256);	
	var text = "Something small to encode, lets hope it's quite quick";
	start = new Date();
	for (var i=0; i<100; i++){
		GibberishAES.enc(text, "secret");
	}
	end = new Date();
	$('#enc').append((end-start)/1000 + " seconds");
	
	var crypt = "U2FsdGVkX1+qbsRBKWqv3Hs8F187/SvIivffz/8tosmb4JocDocxBSTxAIWn1KkzlBRcIdYnlOKhgyJboCHn5SvQw+CDc/RLy2UIKGV2LpI="
	start = new Date();
	for (var i=0; i<100; i++){
		GibberishAES.dec(crypt, "secret");
	}
	end = new Date();
	$('#dec').append((end-start)/1000 + " seconds");
	
	var bigtext = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam volutpat. Sed rhoncus mauris. Proin pellentesque felis in est. Vestibulum bibendum. Etiam nec augue id justo congue interdum. Sed magna. Praesent ac enim. Fusce tempor nibh a elit. Maecenas eget sem nec pede posuere aliquet. Duis ut dolor at purus eleifend sodales. Nulla bibendum volutpat lectus. Suspendisse potenti. Morbi tortor risus, semper a, faucibus nec, lacinia eu, lacus. Integer eros orci, semper quis, congue vitae, lobortis sed, nisl. Nulla sagittis lorem eget velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed facilisis ante nec lacus. Maecenas et tortor. Sed eleifend orci vel elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dolor magna, dapibus id, malesuada vel, luctus non, enim. Etiam pretium nibh quis nunc. Proin egestas nibh nec diam. Proin tellus nisi, tincidunt ac, eleifend ac, aliquet id, tortor. Integer luctus pharetra massa. Nulla facilisi. Sed ante odio, euismod eu, adipiscing id, luctus sit amet, nunc. Vivamus odio. Donec congue orci a felis. Duis lacinia, odio sed tincidunt rhoncus, augue magna tempus magna, ut feugiat felis dui ut odio. Phasellus cursus sapien vitae nulla. Nunc urna. Aliquam dapibus enim sed neque. In ornare luctus nunc. Sed augue neque, luctus sit amet, feugiat vitae, varius at, metus. Donec tellus est, pulvinar ut, faucibus eu, imperdiet vitae, nibh. Donec quis sem id sem sodales interdum. Vivamus eget velit. Fusce convallis mi ac est. Suspendisse justo. Morbi eu neque. Nullam non lacus. Fusce lobortis. Aenean dignissim ligula quis erat lacinia ornare. Nunc accumsan, velit at ultrices tincidunt, enim libero adipiscing sem, eu tempor mauris erat tempor massa. Duis nibh est, tempus a, pretium at, tempor at, dui. Pellentesque erat purus, viverra a, porttitor at, vulputate ut, enim. Aliquam et nisi. Nam ultrices. Donec ut lorem. Nam accumsan magna vitae risus eleifend lobortis. Fusce metus velit, luctus vel, dictum quis, fringilla id, nisi. Aenean et lectus a eros viverra vehicula. Nulla imperdiet laoreet velit. Quisque et est vitae felis commodo lacinia. Etiam bibendum risus. Maecenas lorem risus, porta ac, viverra rutrum, ultrices nec, purus. Phasellus sagittis accumsan elit. Nam venenatis, magna non pretium eleifend, massa eros hendrerit libero, at ultricies dui quam venenatis ante. Ut ultricies tristique dui. Donec volutpat dignissim diam. Maecenas vel massa eget nibh malesuada fermentum. Pellentesque lacinia. In eget est. Vestibulum vel nibh. Sed scelerisque risus et tortor. Phasellus hendrerit. Duis nec erat sed justo vestibulum pretium. Cras rhoncus mollis nisi. Proin rutrum. Morbi lorem. Proin ut felis faucibus pede cursus elementum. Donec dui. Nam nec nisl. Praesent tincidunt massa. Morbi dapibus interdum urna. Duis consectetuer. Fusce quam tortor, consectetuer at, ultricies sed, lacinia quis, diam. Maecenas nisl. Vestibulum auctor fringilla diam. Vestibulum tortor augue, lacinia sed, viverra nec, porta vitae, quam. Nunc sagittis porttitor risus. Integer justo. Integer sagittis, quam eget fermentum vulputate, ante felis lacinia turpis, vitae scelerisque magna erat eget enim. Nunc rhoncus libero vitae erat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam id arcu in metus tincidunt accumsan. In hac habitasse platea dictumst. Proin mauris. Cras mollis urna at ante. Nullam non dolor. Nulla blandit. Vivamus vel urna ac erat pulvinar volutpat. Nullam porttitor. Nunc vel mauris. Aliquam velit. In tempor, ipsum vestibulum aliquet viverra, felis odio lobortis sapien, at dapibus est libero venenatis felis. Nulla bibendum sodales leo. In in nisl. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque bibendum, sapien vitae posuere pulvinar, nisl lorem cursus orci, id porta leo arcu ut nisl. Cras nisi nisi, posuere elementum, porttitor ac, porttitor a, dolor. Integer nullam. Nullam porttitor. Nunc vel mauris. Aliquam velit.Nullam porttitor. Nunc vel mauris. Nunc";
	start = new Date();
	var bigcrypt = ''
	for (var i=0; i<5; i++){
		big_crypt = GibberishAES.enc(bigtext, "secret");
	}
	end = new Date();
	$('#bigenc').append((end-start)/1000 + " seconds");
	
	start = new Date();
	for (var i=0; i<5; i++){
		GibberishAES.dec(big_crypt, "secret");
	}
	end = new Date();
	$('#bigdec').append((end-start)/1000 + " seconds");
}