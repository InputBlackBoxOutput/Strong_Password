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
        return check_pw_strength(pass);
      }
	function check_pw_strength(a) {
		var c = 0;
		//var a = $(this).val();
		if (a.length > 5) {
			if (a.match(/[0-9]/)) {
				c = c + 3
			}
			if (a.match(/[A-Z]/)) {
				c = c + 1
			}
			if (a.match(/[a-z]/)) {
				c = c + 1
			}
			if (a.match(/[#$%&*()!@']/)) {
				c = c + 4
			}
		}
		if (c == 0) {
			// $(this).parent().find(".help").addClass("too_short").removeClass("weak").removeClass("medium").removeClass("strong");
			// $(this).parent().find(".help").find("strong").text("too short")
			return "too short"
		}
		if ((c < 4) && (c > 0)) {
			// $(this).parent().find(".help").removeClass("too_short").addClass("weak").removeClass("medium").removeClass("strong");
			// $(this).parent().find(".help").find("strong").text("weak")
			return "weak"
		}
		if (c > 7) {
			// $(this).parent().find(".help").removeClass("too_short").removeClass("weak").removeClass("medium").addClass("strong");
			// $(this).parent().find(".help").find("strong").text("strong")
			return "strong"
		}
		if ((c <= 7) && (c >= 4)) {
			// $(this).parent().find(".help").removeClass("too_short").removeClass("weak").removeClass("strong").addClass("medium");
			// $(this).parent().find(".help").find("strong").text("good")
			return "good"
		}
}
