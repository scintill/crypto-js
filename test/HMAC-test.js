(function() {
var hashTests = {
	"9294727a3638bb1c13f48ef8158bfc9d": ["Hi There", "\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b"],
	"750c783e6ab0b503eaa86e310a5db738": ["what do ya want for nothing?", "Jefe"],
	"56be34521d144c88dbb8c733f0e8b3f6": [[0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD], [0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA]]
};

var testCases = {
	
	test_HMAC: function() {
		for (var expHash in hashTests) {
			var data = hashTests[expHash];
			var result = Crypto.HMAC(Crypto.MD5, data[0], data[1]);
			Assert.areEqual(expHash, result);
		}
	},

	test_HMACAsync: function() {
		// I didn't implement async MD5, so I'll do SHA256
		var message = "What do ya want for nothing?", key = "Jefe";
		var expHash = Crypto.HMAC(Crypto.SHA256, message, key);

		var thiz = this;
		Crypto.HMAC(Crypto.SHA256, message, key, { callback: function(result) {
				thiz.resume(function() {
					Assert.areEqual(expHash, result);
				});
			} });

		this.wait();
	},

};

TestSuite.add(new YAHOO.tool.TestCase(testCases));

})();
