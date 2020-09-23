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
        /* adapted from medscape script */
        // switch (checkPassword(pass)) {
        //   case 0:
        //     return "Invalid";
        //     break;
        //   case 1:
        //     //$.report.monitor("weakPwd");
        //     return "Too Short";
        //     break;
        //   case 2:
        //     //$.report.monitor("midPwd");
        //     return "Weak";
        //     break;
        //   case 3:
        //     //$.report.monitor("strongPwd")
        //     return "Fair";
        //     break;
        //   case 4:
        //     return "Strong";
        // }
        return passwordStrength(pass)
}
function passwordStrength(password) {
    var desc;
    var score = 0;
    var level;
    if (password.length > 4) score++;
    if ( ( password.match(/[a-z]/) ) && ( password.match(/\d+/) ) ) score++;
    if (password.length > 7) score++;
    if ( password.match(/[~,`,!,@,#,$,%,^,&,*,(, ,),_,-,+,{,},|,;,',.,\/,?,>,<,",:]/) ) {
        desc = "Invalid Character";
        level = 'Pinvalid';
    } else {
        if (password.length < 5 && password.length != 0 ) { desc = "Too Short"; level = 'Pshort'; }
        else {
            if (score == 1 ) { desc = "OK"; level ='Plevel1'; }
            if (score == 2) { desc = "OK"; level ='Plevel2';}
            if (score == 3) { desc = "OK"; level = 'Plevel3';}
        }
    }
    if (password.length == 0 ) { desc = "Blank"; level = ''; }
    return desc + level
}
