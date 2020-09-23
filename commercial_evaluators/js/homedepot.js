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
        /* adapted from homedepot script */
        switch (getPasswordLevel(pass)) {
          case 0:
            return "Weak";
            break;
          case 1:
            return "Good";
            break;
          case 2:
            return "Strong";
        }
      }
function getPasswordLevel(password) {
    var commonPasswordArray = ["12345678", "123123123", "123456789", "987654321", "1234567890", "1q2w3e4r", "1qaz2wsx", "abcd1234", "alexander", "asdfasdf", "asdfghjkl", "baseball", "chocolate", "computer", "football", "homedepot", "homedepot123", "iloveyou", "internet", "jennifer", "liverpool", "michelle", "password", "password1", "princess", "qwertyuiop", "sunshine", "superman", "testpassword", "trustno1", "welcome1", "whatever", "abcdefghi", "abcdefgh", "12345678"];
     //email = email !== undefined ? email : "";
	
	if ((password.length < 8) || (commonPasswordArray.indexOf(password.toLowerCase()) > -1) ||
        ((password.toLowerCase().split(password[0].toLowerCase()).length - 1) == password.length)) {
        return 0;
    }
    var score = 0;
    if (/[a-z]/.test(password)) { //Check lowercase
        score++;
    }
    if (/[A-Z]/.test(password)) { //Check uppercase
        score++;
    }
    if (/\d/.test(password)) { //Check Numbers
        score++;
    }
    if (/^[a-zA-Z0-9- ]*$/.test(password) == false) { //Check Special Characters
        score++;
    }
    if ((score > 1 && (password.length > 12)) || (score > 2 && (password.length > 8))) {
        return 2; //Strong Password
    }
    return 1; // Good Password
};

// $.inArray(password.toLowerCase(),commonPasswordArray)
