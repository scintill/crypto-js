This is my fork of [crypto-js](http://code.google.com/p/crypto-js/) ([original SVN repo]((http://crypto-js.googlecode.com/svn/branches/2.x)).

So far I have added the ability to asynchronously compute (HMAC-)SHA256, which can be useful for heavy hashing on browsers that will complain about the script running too long, and that don't support [Web Workers](https://developer.mozilla.org/En/Using_web_workers).  To use, pass a `callback` key in the `options` parameter, with its value being the function to receive the hash result as its first and only parameter.

I have [minified rollups of several different combinations of hash functions](http://scintill.github.com/crypto-js-e514342f8d886353dd1e5feef915a678289cc6db.zip). The original [Quick-start Guide](http://code.google.com/p/crypto-js/#Quick-start_Guide) is pretty helpful.
