var args = process.argv.slice(2);
var fs = require('fs');
var rs = fs.createReadStream(args[0]);
var ws = fs.createWriteStream(args[1]);
var rl = require('readline').createInterface(rs,ws);
rl.on('line', function (line) {
        ws.write(line+'\t'+tryPs(line)+'\n');
});
rl.on('close', function() {
          ws.end();
          process.exit(0);
});
function tryPs(pass) {
	/* adapted from target script */
	if(!isValidLength(pass) || !isValidPass(pass) || !isValidChars(pass)) return "invalid";
	if(isxStrong(pass)) return "extra strong";
	if(isStrong(pass)) return "strong";
	if(isGood(pass)) return "good";
	if(isWeak(pass)) return "weak";
	else return "invalid";
	
        // switch (getPasswordLevel(pass)) {
        //   case 0:
        //     return "Weak";
        //     break;
        //   case 1:
        //     return "Good";
        //     break;
        //   case 2:
        //     return "Strong";
        // }
}
// function passwordValidator(a) {
// 		if (typeof a === "undefined") throw Error("selector is undefined");
// 		var b = this,
// 			//d = $("ul.pass-requirements li, #strengthRul ul li"),
// 			f = {
// 				isvalidLength: function (g) {
// 					return g.length >= 8 && g.length <= 20
// 				},
// 				isValidPass: function (g) {
// 					var j = /^\d*$/.test(g),
// 						m = /^\W*$/.test(g),
// 						n = /^[a-z]*$/.test(g);
// 					g = /^[A-Z]*$/.test(g);
// 					return j || m || n || g ? false : true
// 				},
// 				isValidChars: function (g) {
// 					return $.validator.methods.filterChars(g, "", {
// 						illegalChars: "<>"
// 					})
// 				},
// 				passType: function (g) {
// 					this.digit = /[0-9]/.test(g);
// 					this.alpha = /[a-z]/.test(g);
// 					this.upper = /[A-Z]/.test(g);
// 					return this
// 				},
// 				isWeek: function (g) {
// 					return g != ""
// 				},
// 				isGood: function (g) {
// 					if (typeof g === "undefined") throw Error("password is not defined!");
// 					return g.length >= 9 && this.passType(g).alpha && this.passType(g).upper
// 				},
// 				isStrong: function (g) {
// 					if (typeof g === "undefined") throw Error("password is not defined!");
// 					return g.length >= 11 && this.passType(g).alpha && this.passType(g).upper && this.passType(g).digit
// 				},
// 				isxStrong: function (g) {
// 					if (typeof g === "undefined") throw Error("password is not defined!");
// 					return g.length >= 15 && this.passType(g).alpha && this.passType(g).upper && this.passType(g).digit
// 				}
// 			}
// 		}

function isValidLength(g) {
	return g.length >= 8 && g.length <= 20
}
function isValidPass(g) {
	var j = /^\d*$/.test(g),
	m = /^\W*$/.test(g),
	n = /^[a-z]*$/.test(g);
	g = /^[A-Z]*$/.test(g);
	return j || m || n || g ? false : true
}
// function isValidChars(g) {
// 	return $.validator.methods.filterChars(g, "", {
// 	illegalChars: "<>"
// 	})
// }
function isValidChars(g) {
	if (g.indexOf('<') != -1 || g.indexOf('>') != -1){
		return false;
	}
	else{
		return true;
	}
}
function passType(g) {
	this.digit = /[0-9]/.test(g);
	this.alpha = /[a-z]/.test(g);
	this.upper = /[A-Z]/.test(g);
	return this
}
function isWeak(g) {
	return g != ""
}
function isGood(g) {
	if (typeof g === "undefined") throw Error("password is not defined!");
	return g.length >= 9 && passType(g).alpha && passType(g).upper
}
function isStrong(g) {
	if (typeof g === "undefined") throw Error("password is not defined!");
	return g.length >= 11 && passType(g).alpha && passType(g).upper && passType(g).digit
}
function isxStrong(g) {
	if (typeof g === "undefined") throw Error("password is not defined!");
	return g.length >= 15 && passType(g).alpha && passType(g).upper && passType(g).digit
}
