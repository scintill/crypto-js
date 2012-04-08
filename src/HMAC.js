(function(){

// Shortcuts
var C = Crypto,
	util = C.util,
	charenc = C.charenc,
	UTF8 = charenc.UTF8,
	Binary = charenc.Binary;

C.HMAC = function (hasher, message, key, options) {

	// Convert to byte arrays
	if (message.constructor == String) message = UTF8.stringToBytes(message);
	if (key.constructor == String) key = UTF8.stringToBytes(key);
	/* else, assume byte arrays already */

	// Allow arbitrary length keys
	if (key.length > hasher._blocksize * 4)
		key = hasher(key, { asBytes: true });

	// XOR keys with pad constants
	var okey = key.slice(0),
		ikey = key.slice(0);
	for (var i = 0; i < hasher._blocksize * 4; i++) {
		okey[i] ^= 0x5C;
		ikey[i] ^= 0x36;
	}

	var callback = options ? options.callback : undefined;

	var postproc = function(hmacbytes) {
		var ret = options && options.asBytes ? hmacbytes :
			   options && options.asString ? Binary.bytesToString(hmacbytes) :
			   util.bytesToHex(hmacbytes);
		if (callback) {
			callback(ret);
		} else {
			return ret;
		}
	};

	if (callback) {
		hasher(ikey.concat(message), { asBytes: true, callback: function(ikeymessagehash) {
			hasher(okey.concat(ikeymessagehash), { asBytes: true, callback: postproc });
		}});
	} else {
		return postproc(hasher(okey.concat(hasher(ikey.concat(message), { asBytes: true })), { asBytes: true }));
	}

};

})();
