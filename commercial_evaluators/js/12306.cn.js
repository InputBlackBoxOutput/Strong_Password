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
        /* adapted from 12306.cn script */
        return checkPwdRank(pass, null, null);
}
function checkPwdRank(h, g, i) {
    //var f = $(h);
    //var j = f.val();
    j = h;
    if (j.length <= 6 || new RegExp("^[a-zA-Z]{6,}$").test(j) || new RegExp("^[0-9]{6,}$").test(j) || new RegExp("^[_]{6,}$").test(j)) {
        //$("#" + g).attr("title", "危险");
        //$("#" + i).html("危险");
	return "dangerous";
    } else {
        if (j.length > 6 && new RegExp("[a-zA-Z]").test(j) && new RegExp("[0-9]").test(j) && new RegExp("[_]").test(j)) {
            //$("#" + g).attr("title", "安全");
            //$("#" + i).html("安全");
	    return "secure";
        } else {
            //$("#" + g).attr("title", "一般");
            //$("#" + i).html("一般");
	    return "average";
        }
    }
}
