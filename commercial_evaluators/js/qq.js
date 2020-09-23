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
	/* adapted from QQ script */
	switch (getPwdRank(pass)) {
		case 0:
		return "Invalid";
		break;
		case 1:
            //$.report.monitor("weakPwd");
            return "Weak";
            break;
            case 2:
            //$.report.monitor("midPwd");
            return "Moderate";
            break;
            case 3:
            //$.report.monitor("strongPwd")
            return "Strong";
        }
    }
var getPwdRank = function(a) {
        var b = 0;
        a.match(/[a-z]/g) && b++;
        a.match(/[A-Z]/g) && b++;
        a.match(/[0-9]/g) && b++;
        a.match(/[^a-zA-Z0-9]/g) && b++;
        b = b > 3 ? 3 : b;
        if (a.length < 6 || /^\d{1,8}$/.test(a))
            b = 0;
        a.length < 8 && b > 1 && (b = 1);
        return b
}
